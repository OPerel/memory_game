/**
 * TODO:
 * 1. Tests (Cypress).
 * 
 * 3. Animation:
 * ... fix card enter anime to make cards enter one at a time;
 * ... refactor card flip anime to framer;
 * ... switch anime library (Spring)?
 * 
 * 4. Add two more difficultly levels.
 * 5. Refactor card state to not manipulate the DOM nodes directly.
 */


import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cardsAtom, clickedSelector, wrongGuessAtom, winAtom } from './utils/recoil';
import { useClickCardListener, useCheckWinListener } from './utils/hooks';

// import { motion, useSpring } from 'framer-motion';
import './App.css';
import CardGame from './components/CardGame/CardGame'
import Card from './components/Card/Card';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {

  const [cards, setCards] = useRecoilState(cardsAtom);
  const clicked = useRecoilValue(clickedSelector);
  const setWrongGuess = useSetRecoilState(wrongGuessAtom);
  const setWin = useSetRecoilState(winAtom);

  useClickCardListener();
  useCheckWinListener();

  const drawCards = async () => {
    try {
      const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
      const deck = await deckRes.json();
      const url = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=12`;
      const card = await fetch(url)
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

  const resetBoard = () => {
    setCards({});
    setWrongGuess(0);
    setWin(false);

    drawCards();
  };

  useEffect(() => {
    drawCards();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="cont">
      <Sidebar reset={() => resetBoard()} />
      <CardGame>
        {
          Object.values(cards).map((card, i) => {
            return (
              card
              ? <Card 
                  key={card.code}
                  classes={`${card.flip ? 'flip' : ''}`}
                  url={card.image}
                  onClick={() => handleClick(card)}
                />
              : <div
                  key={i} 
                  style={{
                    width: 'calc(25% - 10px)',
                    height: 'calc(33.333% - 10px)',
                    margin: '0.8%'
                  }}
                />
            )
          })
        }
      </CardGame>
    </div>
  );
};

export default App;
