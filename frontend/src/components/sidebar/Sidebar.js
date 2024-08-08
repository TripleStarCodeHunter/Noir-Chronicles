import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import GiveUp from '../GiveUp/GiveUp';


const Sidebar = ({onQuery,gameSettings}) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [text, setText] = useState('');
    const [resp,setResp] = useState(null);
    const [showGiveUp,setShowGiveUp] = useState(false)

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    };


    useEffect(()=>{
      // const stored_history=localStorage.getItem("gemini-detective-game-scenario");
      // console.log(" heheheh ",stored_history,null,4)
      console.log(" heheheh ",JSON.parse(localStorage.getItem("gemini-detective-game-scenario")))
      if(localStorage.getItem("gemini-detective-game-scenario")){
        console.log(" entered here ")
        setResp(JSON.parse(localStorage.getItem("gemini-detective-game-scenario")))
      }
    },[])
    // console.log(gameSettings)
    const sendStart = async () => {
        if(gameSettings!=[]){
          try {
            console.log(" Message "+text)
            const res = await fetch('http://localhost:5000/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: "Start Game Difficulty: " +gameSettings[1] }),
            });
    
            const data = await res.json();
            setResp(data);
            onQuery(data)
            localStorage.setItem("gemini-detective-game-scenario",JSON.stringify(data))
            console.log(data)
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
      };

      const sendRestart = async () => {
        try {
          console.log(" Message "+text)
          const res = await fetch('http://localhost:5000/restart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          localStorage.removeItem("gemini-detective-game-scenario")
          localStorage.removeItem("gemini-detective-game-convo")
          window.location.reload();
          // const data = await res.json();
          sendStart()
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

      var start=true
      useEffect(()=>{

        if(gameSettings[2] && start){
          start=false
          sendStart()
        }
    
      },[start, gameSettings[2] ])

    return (
      <div style={{display:"flex"}}>
        {showGiveUp && <GiveUp showGiveUp={showGiveUp}/>}
        <div className="sidebar">
            <div className="buttons">
                <button>Get Hint</button>
                <button onClick={()=>{setShowGiveUp(true)}}>Give Up</button>
                <button className='restart' style={{width:"15%"}}  onClick={sendRestart} ><FontAwesomeIcon icon={faRedo} /></button>
            </div>
            <div className="crime-scene">
                <h3>Crime Scene Explanation</h3>
                <p>{resp?.response}</p>
            </div>
            <div className="notes">
                <h3 style={{textAlign:"center",marginBottom:"3%"}}>Notes</h3>
                <div className="notes-list">
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                </div>
                <div className="chatbox">
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder=" Add a new note"
                    />
                    <button onClick={handleAddNote}>Add</button>
                </div>
            </div>
        </div>

        </div>
    );
};

export default Sidebar;
