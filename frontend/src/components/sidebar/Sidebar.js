import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [notes, setNotes] = useState([
        "First note about the crime.",
        "Second note about the crime.",
        "Third note about the crime."
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
                <p>Details about the crime scene will go here...</p>
            </div>
            <div className="notes">
                <h3>Notes</h3>
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
                        placeholder="Add a new note"
                    />
                    <button onClick={handleAddNote}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
