import React, { Component } from 'react';
import CardGame from './CardGame'
import Card from './Card';

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
        const newCards = cardList.flat();
        return newCards;
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
                            />
                        )
                    })
                }
            </CardGame>
        );
    };
};

export default App;
