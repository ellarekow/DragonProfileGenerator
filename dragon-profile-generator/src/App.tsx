import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw from 'raw-loader!./resources/flightTemplates/lightning.txt';
import CodeSnippet from './components/CodeSnippet';
import * as fs from 'fs';


const flightOptions = ['Arcane', 'Earth', 'Fire', 'Ice', 'Light', 'Lightning', 'Nature', 'Plague', 'Shadow', 'Water', 'Wind', 'Beast'];


const App: React.FC = () => {

  // State to hold the dragon's name and selected flight
  const [dragonName, setDragonName] = useState('');
  const [selectedFlight, setSelectedFlight] = useState('');

  // State to hold the generated text
  const [generatedText, setGeneratedText] = useState('');


  // Function to handle form submission
  const handleGenerateProfile = () => {
    // Generate text based on dragon name and selected flight
    const text = `Dragon Profile:
    Name: ${dragonName}
    Flight: ${selectedFlight}`;

    // Update the generated text state
    setGeneratedText(text);
  };

  const [fileContent, setFileContent] = useState<string>("");


  interface CharacteristicOutput {
    [key: string]: string;
  }

  interface GeneratedData {
    characteristics: CharacteristicOutput;
    title: string;
    traits: string[];
    alignment: string;
    sexuality: string;
  }


  useEffect(() => {
    const fetchBBCode = async () => {
      try {
        fetch(raw).then(r => r.text())
          .then(text => {
            console.log('text decoded:', text);
            setFileContent(text);
          });
      } catch (error) {
        console.error('Error loading BBCode:', error);
      }
    };

    fetchBBCode();
  }, []);


  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Dragon Profile Creator
      </Typography>

      {/* Dragon Information Form */}
      <form>
        {/* Dragon Name Input */}
        <TextField
          label="Dragon Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dragonName}
          onChange={(e) => setDragonName(e.target.value)}
        />

        {/* Flight Dropdown */}
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="flight-label">Flight</InputLabel>
          <Select
            labelId="flight-label"
            label="Flight"
            value={selectedFlight}
            onChange={(e) => setSelectedFlight(e.target.value)}
          >
            {flightOptions.map((flight, index) => (
              <MenuItem key={index} value={flight}>
                {flight}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Generate Profile Button */}
        <Button variant="contained" color="primary" fullWidth onClick={handleGenerateProfile} style={{ marginTop: '20px' }}>
          Generate Profile
        </Button>
      </form>

      {/* Generated Text Box */}
      {generatedText && (
        <Box mt={3} p={2} bgcolor="background.paper" borderRadius={4}>
          <CodeSnippet code={fileContent} />
        </Box>
      )}
      <hr />
      {/* BBCode Parser needs some work
      <BBCodeParser bbcode={fileContent} /> */}
    </Container>
  );
}

export default App;
