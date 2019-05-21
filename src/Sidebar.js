import React from 'react';
import './Sidebar.css';

const Sidebar = ({ reset }) => {
    return (
        <div className="sidebar">
            <p>Match identical card from different suites.</p>
            <button onClick={reset}>Reset Board</button>
            <p>Made by Ori Perelman with a <a href="http://deckofcardsapi.com/" target="_blank" rel="noopener noreferrer">Deck Of Cards</a> API</p>
        </div>
    )
};

export default Sidebar;
