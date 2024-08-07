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
import {Spinner} from 'react-bootstrap'

const Conversation = (query) => {
  const [text, setText] = useState('');
  const [resp,setResp] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Character Select');

  
  const [characterList,setCharacterList] = useState([])
  
  useEffect(()=>{
    console.log(" query ",query)
    if(query.query!=''){
    setCharacterList(query?.query?.suspects)
    console.log(JSON.stringify(characterList,null,4))}
  },[query])

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

  useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem("gemini-detective-game-convo")))
    if(JSON.parse(localStorage.getItem("gemini-detective-game-scenario"))!=null){
      console.log("Entered here")
      setCharacterDict(JSON.parse(localStorage.getItem("gemini-detective-game-convo")))
      // const character_list = JSON.parse(localStorage.getItem("gemini-detective-game-scenario")).suspects;
      
      setCharacterList(JSON.parse(localStorage.getItem("gemini-detective-game-scenario")).suspects)
    }
  },[])

  const [characterDict, setCharacterDict] = useState(() => {
    const savedData = localStorage.getItem("gemini-detective-game-convo");
    return savedData ? JSON.parse(savedData) : [];
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim()==='')return;
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

  useEffect(()=>{
      localStorage.setItem("gemini-detective-game-convo",JSON.stringify(characterDict))
      console.log(JSON.parse(localStorage.getItem("gemini-detective-game-convo")))
  },[characterDict])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent new line in textarea
      handleSubmit(event); // Call submit function
    }
  };

  return (
    <>
      <div className='chat-box'>
        {console.log(characterList)}
        <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
          <CDropdownToggle color="white" className='dropdown-toggle'>
            {selectedItem}
          </CDropdownToggle>
          <CDropdownMenu className="dropdown-menu">
          
            {!characterList?.length ? (
            <CDropdownItem className='dropdown-item' style={{display:"flex",justifyContent:"center"}}>
            <Spinner animation="border" role="status" size="md">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </CDropdownItem>
        ) : (
          
          characterList?.map((character, index) => (
      
            <CDropdownItem
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(character)}
              style={{ whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%" /* or any specific width you prefer */}}
            >
              {character}
            </CDropdownItem>
            
          ))
        )

        }
          
          
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

            {prompt.response}
          </div>
          <div className='space-between-prompts' />
          </>
        )}
      </div>
    ))}
        </div>

        </div>
        <div className='user-area' >
        <form className='frm' onSubmit={handleSubmit} style={{height:"auto"}}>
          <TextareaAutosize
            placeholder={selectedItem === 'Character Select' ? "Please choose a character to talk to..." : "Enter your prompt here..."}  
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='prompt-box'
            // style={{border:"2px solid black"}}
            minRows={1} // Set a minimum number of rows
            disabled={selectedItem === 'Character Select'} // Disable if selectedItem is null
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" color="primary" className='prompt-submit'>
            Submit
          </Button>
        </form>
        {/* <div style={{position:"absolute",bottom:0,width:"100%",border:"2px solid black"}}></div> */}
      </div>
      </div>
    </>
  );
}

export default Conversation;
