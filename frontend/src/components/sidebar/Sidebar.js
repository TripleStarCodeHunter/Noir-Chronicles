import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import ContentLoader from 'react-content-loader';
import './Sidebar.css';
import GiveUp from '../GiveUp/GiveUp';
import GetHint from '../GetHint/GetHint';

const Sidebar = ({onQuery,gameSettings,availableActions}) => {
  const [notes, setNotes] = useState(() => {
    const convo = JSON.parse(localStorage.getItem("gemini-detective-game-convo")) || {};
    if(Object.keys(convo).length === 0){
      localStorage.removeItem("gemini-detective-game-notes");
    }
    const savedNotes = localStorage.getItem("gemini-detective-game-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [newNote, setNewNote] = useState('');
  const [text, setText] = useState('');
  const [resp, setResp] = useState(null);
  const [showGiveUp, setShowGiveUp] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const convo = JSON.parse(localStorage.getItem("gemini-detective-game-convo")) || {};
    if(Object.keys(convo).length === 0){
      localStorage.removeItem("gemini-detective-game-scenario");
    }
    if(localStorage.getItem("gemini-detective-game-scenario")){
      setResp(JSON.parse(localStorage.getItem("gemini-detective-game-scenario")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gemini-detective-game-notes", JSON.stringify(notes));
  }, [notes]);

  const sendStart = async () => {
    if (gameSettings.length > 0) {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const res = await fetch(`${backendUrl}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: "Start Game Difficulty: " + gameSettings[1] }),
        });

        const data = await res.json();
        setResp(data);
        onQuery(data);
        localStorage.setItem("gemini-detective-game-scenario", JSON.stringify(data));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    if (gameSettings[2]) {
      sendStart();
    }
  }, [gameSettings[2]]);

  const sendRestart = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      await fetch(`${backendUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem("gemini-detective-game-scenario");
      localStorage.removeItem("gemini-detective-game-convo");
      localStorage.removeItem("gemini-detective-game-notes");
      window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddNote();
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  return (
    <div style={{display: "flex"}}>
      {showHint && <GetHint showHint={showHint} setShowHint={setShowHint} availableActions={availableActions}/>}
      {showGiveUp && <GiveUp showGiveUp={showGiveUp}/>}
      <div className="sidebar">
        <div className="buttons">
          <button onClick={() => setShowHint(true)}>Get Hint</button>
          <button onClick={() => setShowGiveUp(true)}>Give Up</button>
          <button className='restart' style={{width: "15%"}} onClick={sendRestart}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
        <div className="crime-scene">
          <h3>Crime Scene Explanation</h3>
          {resp ? (
            <p>{resp?.response}</p>
          ) : (
            <ContentLoader
              speed={2} // Faster animation
              width="100%" // Adjust width if needed
              height="100%" // Adjust height if needed
              viewBox="0 0 400 50%"
              backgroundColor="#b3b3b3" // Darker grayish background
              foregroundColor="#999999" // Slightly more grayish foreground
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="18%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="36%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="54%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="72%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="90%" rx="5" ry="5" width="100%" height="10%" /> 


            </ContentLoader>
          )}
        </div>
        <div className="notes">
          <h3 style={{textAlign: "center", marginBottom: "3%"}}>Notes</h3>
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
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleAddNote}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
