/**
 * TODO:
 * 1. Tests (Cypress).
 * 2. State management (Recoil or useReducer and useContext).
 * 3. Animation:
 * ... fix card enter anime to make cards enter one at a time;
 * ... refactor card flip anime to framer;
 * ... switch anime library (Spring)?
 * 
 * 4. Add two more difficullty levels. 
 */


import React, { Component } from 'react';
// import { motion, useSpring } from 'framer-motion';
import './App.css';
import CardGame from './components/CardGame/CardGame'
import Card from './components/Card/Card';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  constructor () {
    super();
    this.state = {
      deck: {},
      cards: [],
      clicked: [],
      wrongGuess: 0,
      win: false
    };
  };

  fetchDeck = async () => {
    try {
      console.log('fetching deck')
      const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
      const deck = await deckRes.json();
      this.setState({ deck }, () => this.drawCards());
    } catch (err) {
      console.log('Error fetching deck: ', err);
    }
    
  };

  drawCards = async () => {
    // console.log('fetching card state.deck: ', this.state.deck)
    try {
      const url = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=12`;
      const card = await fetch(url)
      const cardData = await card.json();
      // console.log('cardData: ', JSON.stringify(cardData, null, 2))
      // this.setState({ cards: cardData.cards })
      cardData.cards.forEach((card, i) => this.pushToCards(card, i))
    } catch (err) {
      console.log('Error fetching card: ', err);
    }
  };

  pushToCards(card, i) {
    this.setState(state => {
      let { cards } = state;
      cards[i] = card;
      return { ...state, cards }
    });
  }

  flipCards(e) {
    if (!e.currentTarget.classList.contains('match')) {
      e.currentTarget.classList.add('flip')
    };
  };

  clickedCards(e, card) {
    const currentCard = e.currentTarget;
    if (this.state.clicked.length === 0) {
      this.setState(state => state.clicked.push({ card: card, node: currentCard }));
    } else if (this.state.clicked[0].card.code !== card.code) {
      this.setState(state => state.clicked.push({ card: card, node: currentCard }));
    };
  };

  compareCards() {
    this.setState(state => {
      const { clicked } = state;
      if (clicked.length === 2) {
        if (clicked[0].card.value === clicked[1].card.value) {
          clicked[0].node.classList.add('match');
          clicked[1].node.classList.add('match');
        } else {
          setTimeout(() => {
            clicked[0].node.classList.remove('flip');
            clicked[1].node.classList.remove('flip');
          }, 1500);
          state.wrongGuess++;
        };
        state.clicked = [];
      };
    }, () => this.checkWin());
  };

  checkWin() {
    const cards = document.querySelectorAll('.match');
    if (cards.length === this.state.cards.length) {
      this.setState({ win: true })
    };
  };

  handleClick = (card) => (e) => {
    this.flipCards(e);
    this.clickedCards(e, card);
    this.compareCards();
  };

  resetBoard() {
    this.setState({
      deck: {},
      cards: [],
      clicked: [],
      wrongGuess: 0,
      win: false
    });
    this.fetchDeck();
  };

  componentDidMount() {
    this.fetchDeck();
  };

  render() {
    // console.log('deck: ', JSON.stringify(this.state.deck ,null, 2))
    // console.log('cards: ', JSON.stringify(this.state.cards ,null, 2))
    const { cards, wrongGuess, win } = this.state;
    return (
      <div className="cont">
        <Sidebar reset={() => this.resetBoard()} countWG={wrongGuess} />
        <CardGame win={win}>
          {
            cards.map((card, i) => {
              return (
                card
                ? <Card 
                    key={card.code}
                    i={i}
                    url={card.image}
                    onClick={this.handleClick(card)}
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
};

export default App;
