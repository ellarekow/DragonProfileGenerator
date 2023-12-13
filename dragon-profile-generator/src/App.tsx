import React, { useState } from 'react';
import TextBoxComponent from './components/textbox-component';

const App: React.FC = () => {

  const [text, setText] = useState<string>('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  return (
    <div className="App">
      <TextBoxComponent title="Enter Text" />
    </div>
  );
}

export default App;
