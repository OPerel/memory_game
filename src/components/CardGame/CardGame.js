import React from 'react';
import './CardGame.css';

import { useRecoilValue } from 'recoil';
import { winAtom, levelAtom } from '../../utils/recoil';

const CardGame = ({ children }) => {
  const win = useRecoilValue(winAtom);
  const level = useRecoilValue(levelAtom);

  return (
    <div className={`memory-game ${level !== 'beginner' ? 'scroll' : ''}`}>
      <div id={win ? 'win' : 'no-win'}>
        <h3>You Win!</h3>
      </div>
      <div className="cards">{children}</div>
    </div>
  );
}

export default CardGame;
