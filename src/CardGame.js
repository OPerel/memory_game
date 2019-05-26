import React from 'react';
import './CardGame.css';

const CardGame = (props) => {
    return (
        <div className='memory-game'>
            <div id={props.win ? 'win' : 'no-win'}>
                <h3>You Win!</h3>
            </div>
            {props.children}
        </div>
    );
};

export default CardGame;
