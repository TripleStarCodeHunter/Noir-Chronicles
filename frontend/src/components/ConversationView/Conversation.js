import './Conversation.css';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import React from 'react';
import backgroundImage from '../../assets/clab.png';
import TextareaAutosize from 'react-textarea-autosize';
import { useState ,useEffect, useRef} from 'react';
import Button from '@mui/joy/Button';
import {Spinner} from 'react-bootstrap';
import Confetti from 'react-confetti';
import Congrats from '../CongratsPopUp/Congrats';

const Conversation = ({query,onUpdateActions}) => {
  const [text, setText] = useState('');
  const [resp,setResp] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Character Select');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [img, setImg] = useState("");


  const handleShowConfetti = () => {
    setShowConfetti(true);
    console.log("Showing confetti")
    // setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
  };

  const handleShowCongrats = () => {
    setShowCongrats(true);
    console.log("Showing congrats")
  };
  
  const [characterList,setCharacterList] = useState([])
  
  useEffect(()=>{
    console.log(" query ",query)
    if(query?.suspects){
    setCharacterList(query?.suspects)
    try {
      const imagePath = require(`../../assets/story2.png`); // Replace with dynamic path if needed
      setImg(imagePath);
      console.log("Image path set:", imagePath);
    } catch (error) {
      console.error("Error loading image:", error);
    }
    console.log(JSON.stringify(characterList,null,4))}
  },[query])

  const sendMessage = async () => {
    try {
      // console.log(" Message "+text)
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${backendUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: selectedItem+" "+text }),
      });

      const data = await res.json();
      console.log(data)
      if (data.win==1)
      {
        handleShowConfetti()
        handleShowCongrats()
      }
      onUpdateActions(data.available_actions); // Update available actions in parent

      if(data.suspects!=characterList){
        console.log(data.suspects)
        console.log(characterList)
        setCharacterList(data.suspects)
      }
      // console.log(" hehehe ",onUpdateActions)
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
  // const containerRef = useRef(null);


  const chatAreaRef = useRef(null);

  // Scroll to bottom of chat-area whenever new messages are added
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [characterDict[selectedItem]]);

  return (
    <>
    {showCongrats && <Congrats/>}
    {showConfetti && (
      <Confetti style={{ margin: "auto", width: "100vw", height: "100vh" }} />
    )}
    <div className='chat-box' style={{ 
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',  // To make sure the image covers the entire area
        backgroundRepeat: 'no-repeat', // To prevent repeating the image
        // backgroundPosition: 'left center',
      }}>
      <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
        <CDropdownToggle color="white" className='dropdown-toggle'>
          {selectedItem}
        </CDropdownToggle>
        <CDropdownMenu className="dropdown-menu">
          {!characterList?.length ? (
            <CDropdownItem className='dropdown-item' style={{ display: "flex", justifyContent: "center" }}>
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
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%"
                }}
              >
                {character}
              </CDropdownItem>
            ))
          )}
        </CDropdownMenu>
      </CDropdown>
      <div className='chat-area' ref={chatAreaRef} style={{ display: "flex", flexDirection: "column", overflowY: "scroll" }}>
        <div className='space-between-prompts' />
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
      <div className='user-area'>
        <form className='frm' onSubmit={handleSubmit} >
          <TextareaAutosize
            placeholder={selectedItem === 'Character Select' ? "Please choose a character to talk to..." : "Enter your prompt here..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='prompt-box'
            minRows={1} // Set a minimum number of rows
            disabled={selectedItem === 'Character Select'} // Disable if selectedItem is null
            onKeyDown={handleKeyDown}
          />
          {/* <Button type="submit" color="primary" className='prompt-submit'>
            Submit
          </Button> */}
          <button type="submit" color="primary" className='prompt-submit'>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          Ask
          </button>
        </form>
      </div>
    </div>
  </>
  );
}

export default Conversation;
