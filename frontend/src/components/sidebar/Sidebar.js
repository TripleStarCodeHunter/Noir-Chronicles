import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [notes, setNotes] = useState([
    ]);
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    };

    return (
        <div className="sidebar">
            <div className="buttons">
                <button>Get Hint</button>
                <button>Give Up</button>
            </div>
            <div className="crime-scene">
                <h3>Crime Scene Explanation</h3>
                <p>hi...</p>
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
