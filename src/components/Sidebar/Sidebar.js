import React from 'react';
import './Sidebar.css';

import { useRecoilValue } from 'recoil';
import { wrongGuessAtom } from '../../utils/recoil';

import LevelSelector from '../LevelSelector/LevelSelector';

const Sidebar = ({ reset }) => {
  const countWg = useRecoilValue(wrongGuessAtom); 
  return (
    <div className="sidebar">
      <div className="header">
        <h2>Memory Game</h2>
        <p>Match pairs from different suites.</p>
        <p>Wrong guesses: {countWg}</p>
        <button className="btn" onClick={reset}>Reset Board</button>
        <LevelSelector />
      </div>
      
      <div className="footer">
        <p>Made with <a href="http://deckofcardsapi.com/" target="_blank" rel="noopener noreferrer">Deck Of Cards</a>.</p>
        <p>Created by <a href="https://github.com/OPerel">Ori Perelman</a> &copy; {new Date().getFullYear()}.</p>
      </div>
    </div>
  )
};

export default Sidebar;
