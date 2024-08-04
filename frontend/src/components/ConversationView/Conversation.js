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

const Conversation = (/*gameSettings*/) => {
  const [text, setText] = useState('');
  const [resp,setResp] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Character Select');
  const [prompts, setPrompts] = useState([]);

  
  const sendMessage = async () => {
    try {
      console.log(" Message "+text)
      const res = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setResp(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  // const sendStart = async () => {
  //   if(gameSettings!=[]){
  //     try {
  //       console.log(" Message "+text)
  //       const res = await fetch('http://localhost:5000/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ message: "Start" }),
  //       });

  //       const data = await res.json();
  //       setResp(data);
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //     }
  //   }
  // };
  // console.log(gameSettings)
  // var start=true
  // useEffect(()=>{
  //   console.log(" here ",gameSettings.begin)
  //     if(gameSettings.begin && start){
  //     console.log("xxx")
  //     start=false
  //     console.log(JSON.stringify(gameSettings,null,4))
  //     console.log(gameSettings.difficulty)    
      
  //     sendStart()
  //   }

  // },[start, gameSettings.begin ])
  
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      setPrompts((prevPrompts) => [...prevPrompts, text]); // Add the new prompt to the list
      
      sendMessage();
      setText(''); // Clear the textarea after submission
    }
  };

  useEffect(() => {
    if (resp) {
      console.log('Scenario from resp:', JSON.stringify(resp,null,4));
      console.log('Scenario from resp:', resp.scenario);
      setPrompts((prevPrompts) => [...prevPrompts, resp.response]);

    }
  }, [resp]);

  return (
    <>
      <div className='chat-box'>
        <CDropdown className='character-select' style={{ borderRadius: "1000px" }}>
          <CDropdownToggle color="white" className='dropdown-toggle'>
            {selectedItem}
          </CDropdownToggle>
          <CDropdownMenu className="dropdown-menu">
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Inspector Gearsmith')}>
              Inspector Gearsmith
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Lady Lavinya')}>
              Lady Lavinya
            </CDropdownItem>
            <CDropdownItem href="#" className="dropdown-item" onClick={() => handleSelect('Fidget')}>
              Fidget
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <div className='chat-area'>
          
        <div className='space-between-prompts' />
        <div style={{display:"flex",flexDirection:"column"}}>
        {prompts.map((prompt, index) => (
          <div key={index}>
            <div className='user-prompt'>
              {prompt}
            </div>
            <div className='space-between-prompts' />
          </div>
        ))}
        </div>
        {/* <div className='comp-response'>
          It is your work detective
        </div> */}
        </div>
        <div style={{minHeight:"12%",borderTop:"2px solid black",paddingTop:"3%",paddingBottom:"5%"}}>
        <form onSubmit={handleSubmit} style={{height:"auto"}}>
          <TextareaAutosize
            placeholder="Enter your prompt here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='prompt-box'
            minRows={1} // Set a minimum number of rows
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
