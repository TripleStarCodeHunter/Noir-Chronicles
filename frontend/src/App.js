import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Game from './pages/Game';
import MobileView from './pages/MobileView'; // Ensure correct capitalization
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState([{ query: '(max-width: 768px)' }]);

  // console.log('isMobile:', isMobile); // Log to check if isMobile is being calculated correctly

  // <Route path="/" element={isMobile ? <MobileView /> : <Game />} />
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isMobile ? <MobileView /> : <Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
