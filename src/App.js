import React, { Component } from 'react';
import './App.css';
import CardGame from './CardGame'
import Card from './Card';
import Sidebar from './Sidebar';

class App extends Component {
  constructor () {
    super();
    this.state = {
      deck: {},
      cards: [
        '', '', '', '',
        '', '', '', '',
        '', '', '', ''
      ],
      clicked: [],
      wrongGuess: 0,
      win: false
    };
  };

  fetchDeck = async () => {
    const deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
    const deckData = await deck.json();
    this.setState(state => {
      return state.deck = deckData;
    },() => this.drawCards());
  };

  drawCards = async () => {
    for (var i = 0; i < this.state.deck.remaining; i++) {
      const card = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`)
      const cardData = await card.json();
      this.pushToCards(cardData.cards[0], i);
    };
  };

  pushToCards(card, i) {
    this.setState(state => {
      return state.cards.splice(i, 1, card);
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
      const {clicked} = state;
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
    return (
      <div className="cont">
        <Sidebar reset={() => this.resetBoard()} countWG={this.state.wrongGuess} />
        <CardGame win={this.state.win}>
          {
            this.state.cards.map((card, i) => {
              return (
                card ? <Card 
                  key={card.code}
                  url={card.image}
                  onClick={this.handleClick(card)}
                />
                : <div
                  key={i} 
                  style={{
                    width: 'calc(25% - 10px)',
                    height: 'calc(33.333% - 10px)',
                    margin: '0.8%'
                  }}/>
              )
            })
          }
        </CardGame>
      </div>
    );
  };
};

export default App;
