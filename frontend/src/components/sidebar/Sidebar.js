import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = (gameSettings) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [text, setText] = useState('');
    const [resp,setResp] = useState(null);

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    };

    const sendStart = async () => {
        if(gameSettings!=[]){
          try {
            console.log(" Message "+text)
            const res = await fetch('http://localhost:5000/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: "Start" }),
            });
    
            const data = await res.json();
            setResp(data);
            console.log(data)
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
      };
      console.log(gameSettings)
      var start=true
      useEffect(()=>{
        console.log(" here ",gameSettings.begin)
          if(gameSettings.begin && start){
          console.log("xxx")
          start=false
          console.log(JSON.stringify(gameSettings,null,4))
          console.log(gameSettings.difficulty)    
          
          sendStart()
        }
    
      },[start, gameSettings.begin ])

    return (
        <div className="sidebar">
            <div className="buttons">
                <button>Get Hint</button>
                <button>Give Up</button>
            </div>
            <div className="crime-scene">
                <h3>Crime Scene Explanation</h3>
                <p>{resp?.scenario}</p>
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
    );
};

export default Sidebar;
