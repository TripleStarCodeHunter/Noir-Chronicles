import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Detective from '../../assets/detective-silhoutte.png'

const style = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  backgroundColor: "#F5DF68",
  // border:"2px solid black",
  background: 'linear-gradient(135deg, #FFF5B7, #FFD700, #FFC300, #FFB300)',

};

export default function Congrats() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const win = 1;
  React.useEffect(() => {
    if (win === 1) {
      setOpen(true);
    }
  }, [win]);

  const sendRestart = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${backendUrl}/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ message: "restart" }),
      });
      localStorage.removeItem("gemini-detective-game-scenario");
      localStorage.removeItem("gemini-detective-game-convo");
      localStorage.removeItem("gemini-detective-game-notes")
      window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
    {open && <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      // onClose={handleClose}
      closeAfterTransition
    //   slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }, // Disable greyed-out background
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={style} style={{paddingBottom:"1%"}}>
          <Typography id="transition-modal-title" variant="h6" component="h2" style={{width:"100%"}}>
            <div style={{ fontSize: "2rem",textAlign:"center",width:"100%"}}>🎉CONGRATULATIONS !!!🎉</div>
            <hr style={{color:"black",width:"70%",margin:"auto"}} />

          </Typography>
          <div style={{height:"33%",width:"30%",borderRadius:"50%",padding:"4%",margin:"auto auto"}}>
          <img src={Detective} width="100%" height="100%" style={{margin:"auto auto"}}/>
          </div>
          <Typography id="transition-modal-description" sx={{ mt: 2,textAlign:"center" }}>
           
          Case Closed! 🕵️‍♂️ You've cracked the case and unveiled the truth. Your keen instincts and sharp mind have made you the ultimate sleuth. 
          Thanks for embarking on this detective journey!
          </Typography>
          <Button onClick={sendRestart} style={{marginTop:"1%",float:"right",color:"#385E72"}}>Restart</Button>
        </Box>
      </Slide>
    </Modal>
    }
    </>

  );
}
