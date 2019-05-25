import React from 'react';
import './Sidebar.css';

const Sidebar = ({ reset, countWG }) => {
    return (
        <div className="sidebar">
            <div className="header">
                <h2>Memory Game</h2>
                <p>Match pairs from different suites.</p>
                <p>Wrong guesses: {countWG}</p>
                <button className="btn" onClick={reset}>Reset Board</button>
            </div>
            <div className="footer">
                <p>Made with <a href="http://deckofcardsapi.com/" target="_blank" rel="noopener noreferrer">Deck Of Cards</a>.</p>
            </div>
        </div>
    )
};

export default Sidebar;
