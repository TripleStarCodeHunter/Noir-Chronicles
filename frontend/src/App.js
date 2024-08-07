import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Game from './pages/Game';
import MobileView from './pages/MobileView'; // Ensure correct capitalization
import './App.css';
import Congrats from './components/CongratsPopUp/Congrats';

function App() {
  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // console.log('isMobile:', isMobile); // Log to check if isMobile is being calculated correctly

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);


   const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element= {isDesktop ? <Game /> : <MobileView />}/>
          {/* <Route path="/congrats" element= {<Congrats/>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;