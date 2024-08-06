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
import { useState } from "react";

import GeminiIcon from'../assets/google-gemini-icon.webp'

const Game = ()=>{
  const [open, setOpen] = React.useState(true);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    border: "none",
    boxShadow: 24,
    p: 4,
    height:"auto"
  };
  const [blur,setBlur]=useState("8px")
  const handleClose = () => setOpen(false);
  // const [text, setText] = React.useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [story,setStory] = useState('1');
  const [query,setQuery] = useState("");

  


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
    return(
      <div className="initial" style={{filter:`blur(${blur})`}}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style} style={{border:"none",backgroundColor:"#B7CFDC",outline:"none"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
              <span style={{fontSize:"2.8rem",width:"100%",textAlign:"center"}}>Welcome</span> 
              {/* <hr style={{ borderTop: "8px solid black",color:"black",borderColor:"black !important"}}/> */}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please choose your settings

              {/* Radio Buttons */}
              <div style={{paddingLeft:"3%"}}>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={story}
                defaultValue="1"
                onChange={handleChange}
                
                 >
                <FormControlLabel value="1" control={<Radio style={{color:"#385E72"}}/>} label="Story 1" />
                <FormControlLabel value="2" control={<Radio />} label="Story 2" />
                <FormControlLabel value="3" control={<Radio />} label="Story 3" />
                </RadioGroup>
              </div>

              <form onSubmit={handleSubmit} style={{height:"auto"}}>

              <div style={{display:"flex",justifyContent:"space-between" ,width:"100%",alignItems:"center",marginTop:"3%"}}>

              {/* Difficulty Dropdown */}
                  <CDropdown className='character-select' style={{ height:"100% !important",borderRadius: "2px",backgroundColor:"#D9E4EC",marginTop:"0",marginLeft:"0"}} required>
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

                  <Button type="submit" color="primary" style={{height:"100%",borderRadius:"2px",backgroundColor:"#385E72",color:"white"}}>
                    Begin!
                  </Button>
                  
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
      
          <div style={{display:"flex", width:"100vw",position:"relative"}} className="App">
          <div style={{flexShrink: 0}}>
            <Sidebar gameSettings={[story,difficulty,begin]} onQuery={setQuery}/>
          </div>
          <div style={{flexGrow: 1}}>

          <Conversation query={query}/>
            
          </div>
        </div>
      </div>

    );
}
export default Game