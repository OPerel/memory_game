import React from 'react';
import './CardGame.css';

const CardGame = (props) => {
    return (
        <div className='memory-game'>{props.children}</div>
    );
};

export default CardGame;
