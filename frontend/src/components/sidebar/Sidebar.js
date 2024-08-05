import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({onQuery,gameSettings}) => {
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
    console.log(gameSettings)
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
            onQuery(data)
            console.log(data)
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
      };

      var start=true
      useEffect(()=>{

        if(/*gameSettings[2] &&*/ start){
          start=false
          sendStart()
        }
    
      },[start, /*gameSettings[2]*/ ])

    return (
        <div className="sidebar">
            <div className="buttons">
                <button>Get Hint</button>
                <button>Give Up</button>
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
    );
};

export default Sidebar;
