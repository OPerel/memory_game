import React, { Component } from 'react';
import CardGame from './CardGame'
import Card from './Card';
import shuffle from './shuffle';

class App extends Component {
    constructor () {
        super();
        this.state = {
            cards: [
                'angular.svg',
                'aurelia.svg',
                'backbone.svg',
                'ember.svg',
                'react.svg',
                'vue.svg'
            ],
            clicked: []
        };
    };

    makeCards() {
        const {cards} = this.state;
        const cardList = cards.map((card, i) => {
            let pair = [card, card];
            return pair;
        });
        const newCards = shuffle(cardList.flat());
        return newCards;
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

    shouldComponentUpdate() {
        if (this.state.clicked.length < 2) {
            return false;
        } else {
            this.setState((prev, state) => {
                prev.clicked = [];
            })
            return false;
        };
    };

    render() {
        return (
            <CardGame>
                {
                    this.makeCards().map((card, i) => {
                        return (
                            <Card
                            key={i}
                            url={card}
                            onClicking={this.handleClick(card)}
                            />
                        )
                    })
                }
            </CardGame>
        );
    };
};

export default App;
