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
 * 5. TypeScript?
 * 6. Refactor button and select styles
 */


import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { cardsAtom, clickedSelector, drawCardsSelector, wrongGuessAtom, winAtom } from './utils/recoil';
import { useClickCardListener, useCheckWinListener } from './utils/hooks';

// import { motion, useSpring } from 'framer-motion';
import './App.css';
import CardGame from './components/CardGame/CardGame'
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
    resetCards();
    resetWin();
    resetWrongGuess();

    try {
      const deckRes = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cardsByLevel}`);
      const deck = await deckRes.json();
      const url = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${countByLevel}`;
      const card = await fetch(url);
      const cardData = await card.json();

      const cardObj = {}; 
      cardData.cards.forEach(card => {
        const { code, image, images, suit, value } = card;
        cardObj[code] = { code, image, images, suit, value, flip: false, match: false }
      })

      setCards(cardObj);
    } catch (err) {
      console.log('Error fetching card: ', err);
    }
  };

  const handleClick = (card) => {
    if (!card.match && clicked.length < 2) {
      const newCard = { ...card, flip: true };
      const newCards = { ...cards, [card.code]: newCard }
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
      <CardGame>
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
      </CardGame>
    </div>
  );
};

export default App;
