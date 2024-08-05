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

  const [prompts2,setPrompts2] = useState(new Map());

  
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

  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (text.trim() !== '') {
  //     const text_json = {writer:"user",message:text}
  //     console.log(" entered here "+text+" "+selectedItem)
  //     setPrompts((prevPrompts) => [...prevPrompts, text_json]); // Add the new prompt to the list

  //     sendMessage();
  //     setText(''); // Clear the textarea after submission
  //   }
  // };

  const [characterDict, setCharacterDict] = useState({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const currentCharacter = selectedItem
  //   setCharacterDict(prevDict => {
  //     // If characterName already exists, append the newText to the existing array
  //     if (prevDict[selectedItem]) {
  //       return {
  //         ...prevDict,
  //         [currentCharacter]: [...prevDict[currentCharacter], text]
  //       };
  //     } else {
  //       // If characterName doesn't exist, create a new array with newText
  //       return {
  //         ...prevDict,
  //         [currentCharacter]: [text]
  //       };
  //     }
     
  //   });
  //   console.log(JSON.stringify(characterDict,null,4))
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const characterName = selectedItem
    setCharacterDict(prevDict => {
      if (prevDict[characterName]) {
        return {
          ...prevDict,
          [characterName]: [...prevDict[characterName], { writer: "user", message: text }]
        };
      } else {
        return {
          ...prevDict,
          [characterName]: [{ writer: "user", message: text }]
        };
      }
    });
    sendMessage()
    console.log(JSON.stringify(characterDict,null,4))
    setText('');
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(event)
  //   setDialogues((prevDialogues) => 
  //     // const newDialogues = new Map(prevDialogues);
  //     // if (newDialogues.has(selectedItem)) {
  //     //   newDialogues.get(selectedItem).push(text);
  //     // } else {
  //     //   newDialogues.set(selectedItem, [text]);
  //     // }
  //     // return newDialogues;
  //     [...prevDialogues.get(selectedItem),text]
  //   );
  //   console.log(JSON.stringify(dialogues,null,4))
  //   setText('');
  // };

  // useEffect(() => {
  //   if (resp) {
  //     setPrompts((prevPrompts) => [...prevPrompts, resp]);
  //   }
  // }, [resp]);

  useEffect(() => {
    if (resp) {
      const selectedCharacter = selectedItem
      setCharacterDict(prevDict => {
        if (prevDict[selectedCharacter]) {
          return {
            ...prevDict,
            [selectedCharacter]: [...prevDict[selectedCharacter], resp]
          };
        } else {
          return {
            ...prevDict,
            [selectedCharacter]: [resp]
          };
        }
      });
    }
  }, [resp]);

  const [dialogues, setDialogues] = useState(new Map());

  useEffect(() => {
    console.log(" Entered here "+selectedItem+" "+text)
    if (resp && selectedItem) {
      setDialogues((prevDialogues) => {
        // Create a copy of the previous dialogues map
        const updatedDialogues = new Map(prevDialogues);

        // Get the existing dialogues for the character or initialize an empty array
        const characterDialogues = updatedDialogues.get(selectedItem) || [];

        // Add the new response to the character's dialogues
        updatedDialogues.set(selectedItem, [...characterDialogues, resp]);

        return updatedDialogues;
      });
    }
  }, [resp, selectedItem]);

  return (
    <>
      <div className='chat-box'>
        <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
          <CDropdownToggle color="white" className='dropdown-toggle'>
            {selectedItem}
          </CDropdownToggle>
          <CDropdownMenu className="dropdown-menu">
          {characterList?.map((character, index) => (
            <CDropdownItem className="dropdown-item" onClick={() => handleSelect(character)}>
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
        {characterDict[selectedItem]?.map((prompt, index) => (
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
        <div className='user-area' >
        <form className='frm'onSubmit={handleSubmit} style={{height:"auto"}}>
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
