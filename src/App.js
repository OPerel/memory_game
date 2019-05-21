import React, { Component } from 'react';
import CardGame from './CardGame'
import Card from './Card';
// import shuffle from './shuffle';

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
        },() => { this.drawCards() }));
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
            e.currentTarget.classList.toggle('flip')
        }
    };

    clickedCards(e, card) {
        const currentCard = e.currentTarget;
        if (currentCard.classList.contains('flip') &&
            !currentCard.classList.contains('match')) {
            this.setState(state => state.clicked.push({ name: card, node: currentCard} ));
        }
    };

    compareCards() {
        this.setState((prev, state) => {
            const {clicked} = prev;
            if (clicked.length === 2) {
                if (clicked[0].name === clicked[1].name) {
                    clicked[0].node.classList.add('match');
                    clicked[1].node.classList.add('match');
                } else {
                    setTimeout(() => {
                        clicked[0].node.classList.remove('flip');
                        clicked[1].node.classList.remove('flip');
                    }, 1500)
                };
            };
        });
    };

    handleClick = (card) => (e) => {
        this.flipCards(e);
        this.clickedCards(e, card);
        this.compareCards();
    };

    // shouldComponentUpdate() {
    //     if (this.state.clicked.length < 2) {
    //         return false;
    //     } else {
    //         this.setState((prev, state) => {
    //             prev.clicked = [];
    //         })
    //         return false;
    //     };
    // };

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
