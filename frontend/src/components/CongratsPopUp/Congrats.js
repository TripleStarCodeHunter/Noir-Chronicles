import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  backgroundColor: "pink"
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
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    //   slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            <span style={{ fontSize: "20px",textAlign:"center",width:"100%" }}>CONGRATULATIONS !!!</span>
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            You beat the game
          </Typography>
          <Button onClick={sendRestart}>Restart</Button>
        </Box>
      </Slide>
    </Modal>
  );
}
