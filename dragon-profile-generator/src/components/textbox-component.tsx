// Import React and necessary types
import React, { ChangeEvent, FC, useState } from 'react';

// Define the properties for the component
interface TextBoxComponentProps {
    title: string;
}

// Define the state for the component
interface TextBoxComponentState {
    inputValue: string;
}

// Create the TextBoxComponent
const TextBoxComponent: FC<TextBoxComponentProps> = ({ title }) => {
    // Set up state using the useState hook
    const [inputValue, setInputValue] = useState<string>('');

    // Event handler for input changes
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Render the component
    return (
        <div>
            <div>{title}</div>
            <input
                type="text"
                placeholder="Type here..."
                onChange={handleInputChange}
                style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
            />
        </div>
    );
};

export default TextBoxComponent;
