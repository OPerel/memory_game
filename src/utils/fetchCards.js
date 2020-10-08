export default (cardsByLevel, countByLevel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deckRes = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cardsByLevel}`);
      const deck = await deckRes.json();
      const url = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${countByLevel}`;
      const card = await fetch(url);
      const cardData = await card.json();
  
      const cardObj = transformCardData(cardData);
      resolve(cardObj);
    } catch (err) {
      console.log('Error fetching card: ', err);
      reject(err);
    }
  });
};

const transformCardData = (cardData) => {
  const cardObj = {}; 
  cardData.cards.forEach(card => {
    const { code, image, images, suit, value } = card;
    cardObj[code] = { code, image, images, suit, value, flip: false, match: false };
  });
  return cardObj;
};