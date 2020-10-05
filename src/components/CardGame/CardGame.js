import React from 'react';
import './CardGame.css';

import { useRecoilValue } from 'recoil';
import { winAtom } from '../../utils/recoil';

const CardGame = ({ children }) => {
  const win = useRecoilValue(winAtom);
  return (
    <div className='memory-game'>
      <div id={win ? 'win' : 'no-win'}>
        <h3>You Win!</h3>
      </div>
      <div className="cards">{children}</div>
    </div>
  );
}

export default CardGame;
