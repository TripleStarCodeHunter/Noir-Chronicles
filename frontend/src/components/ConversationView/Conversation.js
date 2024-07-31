import './Conversation.css';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import Button from '@mui/joy/Button';

const Conversation = () => {
  const [text, setText] = useState('');
  const [selectedItem, setSelectedItem] = useState('Character Select');
  const [prompts, setPrompts] = useState(['Who do you think is the killer?']);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      setPrompts((prevPrompts) => [...prevPrompts, text]); // Add the new prompt to the list
      setText(''); // Clear the textarea after submission
    }
  };

  return (
    <>
      <div className='chat-box'>
        <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
          <CDropdownToggle color="white" className='dropdown-toggle'>
            {selectedItem}
          </CDropdownToggle>
          <CDropdownMenu className="dropdown-menu">
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Inspector Gearsmith')}>
              Inspector Gearsmith
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Lady Lavinya')}>
              Lady Lavinya
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Fidget')}>
              Fidget
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <div className='space-between-prompts' />
        <div style={{display:"flex",flexDirection:"column"}}>
        {prompts.map((prompt, index) => (
          <div key={index}>
            <div className='user-prompt'>
              {prompt}
            </div>
            <div className='space-between-prompts' />
          </div>
        ))}
        </div>
        <div className='comp-response'>
          It is your work detective
        </div>

        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            placeholder="Enter your prompt here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='prompt-box'
            minRows={1} // Set a minimum number of rows
          />
          <Button type="submit" color="primary" className='prompt-submit'>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Conversation;
