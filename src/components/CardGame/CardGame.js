import React from 'react';
import './CardGame.css';

const CardGame = (props) => {
  return (
    <>
      <div id={props.win ? 'win' : 'no-win'}>
        <h3>You Win!</h3>
      </div>
      <div className='memory-game'>
        {props.children}
      </div>
    </>
  );
};

export default CardGame;
