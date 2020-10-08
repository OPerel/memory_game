/**
 * TODO:
 * 1. Tests (Cypress).
 * 
 * 3. Animation:
 * ... fix card enter anime to make cards enter one at a time;
 * ... refactor card flip anime to framer;
 * ... switch anime library (Spring)?
 * 
 * 4. Style difficulty levels board
 * 5. TypeScript (?)
 * 6. Refactor button and select styles (sass? cssInJS?)
 * 7. Refactor drawCards and handleCLick to recoil (?)
 * 8. Loading animation
 */


import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { cardsAtom, clickedSelector, drawCardsSelector, wrongGuessAtom, winAtom } from './utils/recoil';
import { useClickCardListener, useCheckWinListener } from './utils/hooks';
import fetchCards from './utils/fetchCards';

// import { motion, useSpring } from 'framer-motion';
import './App.css';
import CardGame from './components/CardGame/CardGame';
import Card from './components/Card/Card';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {

  const [cards, setCards] = useRecoilState(cardsAtom);
  const clicked = useRecoilValue(clickedSelector);
  const [cardsByLevel, countByLevel] = useRecoilValue(drawCardsSelector);

  const resetCards = useResetRecoilState(cardsAtom);
  const resetWin = useResetRecoilState(winAtom);
  const resetWrongGuess = useResetRecoilState(wrongGuessAtom);

  useClickCardListener();
  useCheckWinListener();

  const drawCards = async () => {
    if (Object.keys(cards).length) {
      resetCards();
      resetWin();
      resetWrongGuess();
    }

    setCards(await fetchCards(cardsByLevel, countByLevel));
  };

  const handleClick = (card) => {
    if (!card.match && clicked.length < 2) {
      const newCard = { ...card, flip: true };
      const newCards = { ...cards, [card.code]: newCard };
      setCards(newCards);
    } 
  };

  useEffect(() => {
    drawCards();
    // eslint-disable-next-line
  }, [cardsByLevel]);

  return (
    <div className="cont">
      <Sidebar reset={() => drawCards()} />
      {Object.keys(cards).length ? <CardGame>
        {
          Object.values(cards).map(card => (
            <Card 
              key={card.code}
              classes={`${card.flip ? 'flip' : ''}`}
              url={card.image}
              onClick={() => handleClick(card)}
            />
          ))
        }
      </CardGame> : <h1 style={{ margin: '20% auto', fontSize: '3rem' }}>Loading</h1>}
    </div>
  );
};

export default App;
