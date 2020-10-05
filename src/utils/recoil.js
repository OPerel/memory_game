import { atom, selector } from 'recoil';

/*** Atoms ***/

const cardsAtom = atom({
  key: 'cards',
  default: {}
});

const wrongGuessAtom = atom({
  key: 'wrongGuess',
  default: 0
});

const winAtom = atom({
  key: 'win',
  default: false
});

const levelAtom = atom({
  key: 'level',
  default: 'beginner'
})

/*** Selectors ***/

const clickedSelector = selector({
  key: 'clickedCardsSelector',
  get: ({ get }) => {
    const cards = get(cardsAtom);
    return Object.values(cards).filter(card => card.flip && !card.match);
  }
});

const matchedSelector = selector({
  key: 'matchedCardsSelector',
  get: ({ get }) => {
    const cards = get(cardsAtom);
    return Object.values(cards).filter(card => card.match);
  }
});

// const levelSelector = selector({
//   key: 'levelSelector',
//   get: ({ get }) => get(levelAtom),
//   set: ({ set }, newValue) => set(levelAtom, newValue)
// });

// Export
export {
  cardsAtom,
  wrongGuessAtom,
  winAtom,
  clickedSelector,
  matchedSelector,
  levelAtom
}

















// const deckSelector = selector({
//   key: 'deckSelector',
//   get: async () => {
//     const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
//     const deckData = await deckRes.json();
//     return deckData;
//   },
  // set: async ({ set }) => {
  //   const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
  //   const deckData = await deckRes.json();
  //   set(deck, deckData)
  // }
// });

// const cardsSelector = selector({
//   key: 'cardsSelector',
//   get: async ({ get }) => {
//     const deckId = get(deck);
//     console.log('deckId: ', deckId)
//     const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=12`;
//     const card = await fetch(url)
//     const cardData = await card.json();
//     console.log('cardData: ', cardData)
//   }
// });