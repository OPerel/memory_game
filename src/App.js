import React, { Component } from 'react';
import CardGame from './CardGame'
import Card from './Card';

class App extends Component {
    constructor () {
        super();
        this.state = {
            deck: {},
            cards: [],
            clicked: []
        };
    };

    fetchDeck() {
        return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=9S,9H,0S,0H,JS,JH,QS,QH,KS,KH,AS,AH')
        .then(resp => resp.json())
        .then(data => this.setState(state => {
            return state.deck = data;
        },() => this.drawCards()));
    }

    drawCards() {
        for (var i = 0; i < this.state.deck.remaining; i++) {
            fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`)
            .then(resp => resp.json())
            .then(card => this.setState(state => {
                return state.cards.push(card.cards[0]);
            }));
        };
    };

    flipCards(e) {
        if (!e.currentTarget.classList.contains('match')) {
            e.currentTarget.classList.add('flip')
        }
    };

    clickedCards(e, card) {
        const currentCard = e.currentTarget;
        if (this.state.clicked.length === 0) {
            this.setState(state => state.clicked.push({ card: card, node: currentCard }));
        } else if (this.state.clicked[0].card.code !== card.code) {
            this.setState(state => state.clicked.push({ card: card, node: currentCard }));
        }
        console.log(this.state.clicked);
    };

    compareCards() {
        this.setState((prev, state) => {
            const {clicked} = prev;
            if (clicked.length === 2) {
                if (clicked[0].card.value === clicked[1].card.value) {
                    clicked[0].node.classList.add('match');
                    clicked[1].node.classList.add('match');
                } else {
                    setTimeout(() => {
                        clicked[0].node.classList.remove('flip');
                        clicked[1].node.classList.remove('flip');
                    }, 1500)
                };
                prev.clicked = [];
            }
        });
    };

    handleClick = (card) => (e) => {
        this.flipCards(e);
        this.clickedCards(e, card);
        this.compareCards();
    };

    componentDidMount() {
        this.fetchDeck();
    }

    render() {
        return (
            <CardGame>
                {
                    this.state.cards.map((card, i) => {
                        return (
                            <Card
                            key={i}
                            url={card.image}
                            onClicking={this.handleClick(card)}
                            />
                        )
                    })
                }
            </CardGame>
        );
    }
};

export default App;
