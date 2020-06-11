import React from 'react';
import './CardGame.css';

const CardGame = (props) => (
    <div className='memory-game'>
      <div id={props.win ? 'win' : 'no-win'}>
        <h3>You Win!</h3>
      </div>
      <div className="cards">{props.children}</div>
    </div>
);

export default CardGame;
