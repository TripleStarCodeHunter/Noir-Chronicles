import './Conversation.css';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import TextareaAutosize from 'react-textarea-autosize';
import { useState ,useEffect} from 'react';
import Button from '@mui/joy/Button';

const Conversation = (query) => {
  const [text, setText] = useState('');
  const [resp,setResp] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Character Select');
  const [prompts, setPrompts] = useState([]);

  
  const [characterList,setCharacterList] = useState([])
  
  useEffect(()=>{setCharacterList(query?.query?.suspects)},[query])

  const sendMessage = async () => {
    try {
      console.log(" Message "+text)
      const res = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: selectedItem+" "+text }),
      });

      const data = await res.json();
      setResp(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      const text_json = {writer:"user",message:text}
      setPrompts((prevPrompts) => [...prevPrompts, text_json]); // Add the new prompt to the list
      
      sendMessage();
      setText(''); // Clear the textarea after submission
    }
  };

  useEffect(() => {
    if (resp) {
      setPrompts((prevPrompts) => [...prevPrompts, resp]);
    }
  }, [resp]);

  return (
    <>
      <div className='chat-box'>
        <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
          <CDropdownToggle color="white" className='dropdown-toggle'>
            {selectedItem}
          </CDropdownToggle>
          <CDropdownMenu className="dropdown-menu">
          {characterList?.map((character, index) => (
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect(character)}>
            {character}
          </CDropdownItem>
          ))}
            {/* <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Inspector Gearsmith')}>
              Inspector Gearsmith
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Lady Lavinya')}>
              Lady Lavinya
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Fidget')}>
              Fidget
            </CDropdownItem> */}
          </CDropdownMenu>
        </CDropdown>
        <div className='chat-area'>
          
        <div className='space-between-prompts' />
        <div style={{display:"flex",flexDirection:"column"}}>
        {prompts.map((prompt, index) => (
  <div key={index}>
        {prompt.writer === "user" ? (
          <>
            <div className='user-prompt'> 
              {prompt.message}
            </div>
            <div className='space-between-prompts' />
          </>
        ) : (
          <>
          <div className='comp-response'>
            {/* Replace this with the component you want to display for "gemini" writer */}
            {prompt.response}
          </div>
          <div className='space-between-prompts' />
          </>
        )}
      </div>
    ))}
        </div>
        {/* <div className='comp-response'>
          It is your work detective
        </div> */}
        </div>
        <div style={{minHeight:"12%",borderTop:"2px solid black",paddingTop:"3%",paddingBottom:"5%"}}>
        <form onSubmit={handleSubmit} style={{height:"auto"}}>
          <TextareaAutosize
  placeholder={selectedItem === 'Character Select' ? "Please choose a character to talk to..." : "Enter your prompt here..."}  
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='prompt-box'
            minRows={1} // Set a minimum number of rows
            disabled={selectedItem === 'Character Select'} // Disable if selectedItem is null

          />
          <Button type="submit" color="primary" className='prompt-submit'>
            Submit
          </Button>
        </form>
      </div>
      </div>
    </>
  );
}

export default Conversation;
