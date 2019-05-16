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
            ]
        };
    };

    makeCards() {
        const {cards} = this.state;
        const cardList = cards.map((card, i) => {
            let pair = [card, card];
            return pair;
        })
        const newCards = shuffle(cardList.flat());
        return newCards;
    }

    flipCards(e) {
        e.currentTarget.classList.toggle('flip')
    }

    handleClick = (card) => (e) => {
        this.flipCards(e);
    }

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
