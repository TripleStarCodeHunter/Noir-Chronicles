import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './GetHint.css'
import { useEffect, useState } from 'react';
import TextLoading from '../TextLoading/TextLoading';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    border: "none",
    boxShadow: 24,
    p: 4,
    height:"auto",
    background: 'linear-gradient(135deg, #B2B2B2, #6A6A6A)',
    borderRadius:"20px",
    color:"white"
  };
const GetHint = ({showHint,setShowHint,availableActions})=>{

  const [resp,setResp] = useState('')


  const sendHint = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${backendUrl}/hint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message : "#1ad57b3o0 get hint" }),
      });

      const data = await res.json();
      console.log(data)
      setResp(data);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

    const [getHint,setGetHint] = useState(showHint)
    useEffect(()=>{
        setGetHint(showHint)
        if (showHint)
        {
          sendHint()
        }
    },[showHint])

    useEffect(()=>{
        console.log(availableActions)
    },[availableActions])

  const handleClose = () => {setGetHint(false);
    setShowHint(false)
  }

    return(
      <>
      {getHint && (
        <div className="give-up">
          <Modal
            open={getHint}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
            BackdropProps={{
              style: { backgroundColor: 'transparent' }, // Disable greyed-out background
            }}
          >
            <Box sx={style} style={{ backgroundColor: "#B7CFDC" }} className="give-up-box">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                <span style={{ fontSize: "2.8rem", width: "100%", textAlign: "center" }}>
                  Hint
                </span>
                <hr style={{ color: "black", width: "70%", margin: "auto" }} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {resp ? (
                  <div className="actions-list">
                    {resp.hint}
                    <h5>Available Actions</h5>
                    <ul>
                      {resp.available_actions?.map((action, index) => (
                        <li key={index} style={{ cursor: 'pointer' }}>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <TextLoading />
                )}
                <div style={{ width: "100%", marginTop: "5%" }}>
                  {/* <Button
                    onClick={handleClose}
                    color="primary"
                    style={{
                      height: "100%",
                      borderRadius: "2px",
                      backgroundColor: "#385E72",
                      color: "white",
                      float: "right",
                    }}
                  >
                    OK
                  </Button> */}

              <button onClick={handleClose} style={{
                      // height: "100%",
                      borderRadius: "2px",
                      // backgroundColor: "#385E72",
                      // color: "white",
                      float: "right",
                    }} 
                    class="get-hint-ok">
                OK
              </button>
              
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </>
    
          
    );
}

export default GetHint