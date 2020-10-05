import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cardsAtom, clickedSelector, wrongGuessAtom, matchedSelector, winAtom } from './recoil';

const useClickCardListener = () => {
  const clicked = useRecoilValue(clickedSelector);
  const [cards, setCards] = useRecoilState(cardsAtom);
  const [wrongGuess, setWrongGuess] = useRecoilState(wrongGuessAtom);

  useEffect(() => {
    if (clicked.length < 2) return;

    if (clicked[0].value === clicked[1].value) {
      const matchedCards = {
        [clicked[0].code]: { ...clicked[0], match: true },
        [clicked[1].code]: { ...clicked[1], match: true }
      }
      setCards({ ...cards, ...matchedCards });
    } else {
      setTimeout(() => {
        const revertClicked = {
          [clicked[0].code]: { ...clicked[0], flip: false },
          [clicked[1].code]: { ...clicked[1], flip: false }
        }
        setCards({ ...cards, ...revertClicked })
      }, 1500);

      setWrongGuess(wrongGuess + 1)
    };
    // eslint-disable-next-line 
  }, [clicked])
}

const useCheckWinListener = () => {
  const cards = useRecoilValue(cardsAtom);
  const setWin = useSetRecoilState(winAtom);
  const matched = useRecoilValue(matchedSelector);

  useEffect(() => {
    const keys = Object.keys(cards).length;
    if (keys && keys === matched.length) {
      console.log('WIN!!!!!!!!!!!!');
      setWin(true);
    };
    // eslint-disable-next-line 
  }, [matched])
}

export {
  useClickCardListener,
  useCheckWinListener
}