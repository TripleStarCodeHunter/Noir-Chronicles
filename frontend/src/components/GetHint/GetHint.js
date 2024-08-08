import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './GetHint.css'
import { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    border: "none",
    boxShadow: 24,
    p: 4,
    height:"auto"
  };
const GetHint = ({showHint,setShowHint,availableActions})=>{

    const [getHint,setGetHint] = useState(showHint)
    useEffect(()=>{
        setGetHint(showHint)
    },[showHint])

    useEffect(()=>{
        console.log(availableActions)
    },[availableActions])

  const handleClose = () => {setGetHint(false);
    setShowHint(false)
  }

    return(
        <>
        {getHint && 
            <div className="give-up">
              <Modal
                open={getHint}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
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
                  <div className="actions-list">
                        <h5>Available Actions</h5>
                        <ul>
                        {availableActions.map((action, index) => (
                            <li key={index} style={{ cursor: 'pointer' }}>
                            {action}
                            </li>
                        ))}
                        </ul>
                    </div>   
                    <div style={{ width: "100%", marginTop: "5%" }}>
                      <Button
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
                      </Button>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          }
          </>
          
    );
}

export default GetHint