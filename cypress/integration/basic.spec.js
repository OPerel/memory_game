describe('My basic tests', () => {

  let polyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'

    cy.request(polyfillUrl)
    .then((response) => {
      polyfill = response.body
    })

    cy.server();

    cy.fixture('deck.json').as('getDeckJson');
    cy.route('GET', '/api/deck/new/**', '@getDeckJson');

    cy.fixture('cards.json').as('getCardsJson');
    cy.route('GET', '/api/deck/**/draw/**', '@getCardsJson');

    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
        delete win.fetch
        win.eval(polyfill)
        win.fetch = win.unfetch
      },
    })

  });

  it('finds the content "Memory Game"', () => {
    cy.contains('Memory Game');
  });

  it('first card is 9H', () => {
    cy.get('.card')
      .first()
      .children('.inner-card')
      .children('.front-face')
      .children('img')
      .should('have.attr', 'src', 'https://deckofcardsapi.com/static/img/9H.png')
  });

  it ('clicks a card', () => {
    cy.get('.card')
      .first()
      .click()
      .children()
      .should('have.class', 'flip');
  });

  // it('clicks two different cards and compare them', () => {
  //   cy.get('.cards')
  //     .children()
  //     .not('.flip')
  //     .click()
  //     .should('have.class', 'flip');
  // });
})