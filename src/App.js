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
        e.currentTarget.classList.toggle('flip')
    };

    clickedCards(e, card) {
        // const currentCard = e.currentTarget;
        this.setState(state => state.clicked.push(card));
    };

    compareCards() {
        const {clicked} = this.state;
        console.log(this.state.clicked);
        if (clicked.length === 2) {
            console.log(clicked[0], clicked[1]);
            if (clicked[0] === clicked[1]) {
                console.log(true);
            } else {
                console.log(false);
            };
        };
    };

    handleClick = (card) => (e) => {
        this.flipCards(e);
        this.clickedCards(e, card);
        this.compareCards();
    };

    shouldComponentUpdate() {
        if (this.state.clicked.length <= 2) {
            return false;
        } else {
            this.setState({ clicked: [] })
            return false;
        }
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
