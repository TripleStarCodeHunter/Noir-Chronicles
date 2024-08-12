import Conversation from "../components/ConversationView/Conversation";
import Sidebar from "../components/sidebar/Sidebar";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Game.css'
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState,useEffect } from "react";

import GeminiIcon from'../assets/google-gemini-icon.webp'
import Congrats from "../components/CongratsPopUp/Congrats";

const Game = ()=>{
  const [open, setOpen] = React.useState(true);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: "none",
    boxShadow: 24,
    p: 4,
    height:"auto",
    background: 'linear-gradient(135deg, #D2B48C,#4A4A4A)',
    color:" #f5f5f5",
    borderRadius:"20px"

  };
  const [blur,setBlur]=useState("8px")
  const [difficulty, setDifficulty] = useState('Easy');
  const [story,setStory] = useState('Neo-Victorian-Murder');
  const [query,setQuery] = useState("");
  const [availableActions, setAvailableActions] = useState([]); // New state for available actions


  
  const [chatHistory,setChatHistory] = useState([])

  useEffect(()=>{
    if(localStorage.getItem("gemini-detective-game-convo")){
      setChatHistory(JSON.parse(localStorage.getItem("gemini-detective-game-convo")))
      setBlur("0px")
    }
  },[])

  const handleChange = (event) => {
    setStory(event.target.value);
    console.log(story)
  };

  const handleSelect = (item) => {
    setDifficulty(item);
  };
  const [begin,setBegin] = useState(false)

  const handleSubmit = (item) => {
    setBegin(true)
    setBlur("0px")
    setOpen(false)
  };

  // useEffect(()=>{
  //   console.log(availableActions)
  // },[availableActions])

    return(
      
      <div className="initial" style={{filter:`blur(${blur})`}}>
        {/* <Congrats/> */}
      { chatHistory?.length==0 && <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style} style={{border:"none",backgroundColor:"#B7CFDC",outline:"none"}} className="animated-background">
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
              <span style={{fontSize:"2.8rem",width:"100%",textAlign:"center"}}>Welcome</span> 
              <hr style={{ color: "black", width: "70%", margin: "auto" }} />

              {/* <hr style={{ borderTop: "8px solid black",color:"black",borderColor:"black !important"}}/> */}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Choose your preferences :

              {/* Radio Buttons */}
              <div style={{paddingLeft:"3%"}}>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={story}
                defaultValue="Neo-Victorian-Murder"
                onChange={handleChange}
                
                 >
                <FormControlLabel value="Neo-Victorian-Murder" control={<Radio style={{color:"#4A4A4A"}}/>} label="The Neo Victorian Murder" />
                <FormControlLabel value="The-Silent-Witness" control={<Radio style={{color:"#4A4A4A"}}/>} label="The Silent Witness" />
                <FormControlLabel value="The-Vanishing-Artist" control={<Radio style={{color:"#4A4A4A"}}/>} label="The Vanishing Artist" />
                </RadioGroup>
              </div>

              <form onSubmit={handleSubmit} style={{height:"auto"}}>

              <div style={{height:"100%",display:"flex",justifyContent:"space-between" ,width:"100%",alignItems:"center",marginTop:"3%",verticalAlign:"center"}}>

              {/* Difficulty Dropdown */}
                  <CDropdown className='character-select' style={{height:"50px", borderRadius: "2px",backgroundColor:"#D8C6A7",marginTop:"0",marginLeft:"0"}} required>
                    <CDropdownToggle color="black" className='dropdown-toggle' >
                      {difficulty}
                    </CDropdownToggle>
                    <CDropdownMenu className="dropdown-menu">
                      <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Easy')}>
                        Easy
                      </CDropdownItem>
                      <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Medium')}>
                        Medium
                      </CDropdownItem>
                      <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Hard')}>
                        Hard
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>

                  {/* <Button type="submit" color="primary" style={{height:"100%",borderRadius:"2px",backgroundColor:"#6D6D6D",color:"white"}} className="begin-button">
                    Begin!
                  </Button> */}

                <div class="begin-button">
                  <button class="begin-btn" type="submit" style={{height:"50px"}}><span></span><p data-start="good luck!" data-text="start!" data-title="new game"></p></button>
                </div>
                  
                </div>
                </form>
                <div style={{width:"100%",textAlign:"center",marginTop:"5%",marginBottom:"-3.8%"}}>
                  <img src={GeminiIcon} style={{width:"10%",height:"100%"}}/>
                    &nbsp;&nbsp; 
                    
                    Powered by Gemini
                    
                </div>
            </Typography>
          </Box>
        </Modal>
        }
          <div style={{display:"flex", width:"100vw",position:"relative"}} className="App">
          <div style={{flexShrink: 0}}>
          <Sidebar gameSettings={[story, difficulty, begin]} onQuery={setQuery} availableActions={availableActions} />
          </div>
          <div style={{flexGrow: 1}}>

          <Conversation query={query} onUpdateActions={setAvailableActions} />
            
          </div>
        </div>
      </div>
      

    );
}
export default Game