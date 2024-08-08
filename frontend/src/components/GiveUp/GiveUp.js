import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './GiveUp.css'
import { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: "none",
    boxShadow: 24,
    p: 4,
    height:"auto"
  };
const GiveUp = ({showGiveUp})=>{

  const [resp,setResp] = useState('')
    
    const sendRestart = async () => {
        try {
          const res = await fetch('http://localhost:5000/restart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: "restart" }),
          });
          localStorage.removeItem("gemini-detective-game-scenario");
          localStorage.removeItem("gemini-detective-game-convo");
          window.location.reload();
        } catch (error) {
          console.error('Error sending message:', error);
        }
        sendRestart()
      };

      useEffect(()=>{
        sendGiveUp()
      },[showGiveUp])

      const sendGiveUp = async () => {
    try {
      // console.log(" Message "+text)
      const res = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "#1ad57b3o0 Give Up. Explain the solution and who was the culprit" }),
      });

      const data = await res.json();
      console.log(data.response)
      // if (data.win==1)
      // {
      //   handleShowConfetti()
      // }
      setResp(data.response);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }

  }

    return(
        <div className="give-up">
            <Modal
          open={showGiveUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style} style={{border:"none",backgroundColor:"#B7CFDC",outline:"none",width:"38%"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
              <span style={{fontSize:"2.8rem",width:"100%",textAlign:"center"}}>Solution</span> 

            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {resp}
              
              

              <div style={{width:"100%",marginTop:"5%"}}>


                  <Button onClick={sendRestart} color="primary" style={{marginTop:"2%",height:"100%",borderRadius:"2px",backgroundColor:"#385E72",color:"white",float:"right"}}>
                        Restart
                  </Button>
                  
                </div>
                
                
            </Typography>
          </Box>
        </Modal>
        </div>
    );
}

export default GiveUp