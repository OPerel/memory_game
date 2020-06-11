/// <reference types="Cypress" />

describe('API tests', () => {
  let polyfill

  // grab fetch polyfill from remote URL, could be also from a local package
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'

    cy.request(polyfillUrl)
    .then((response) => {
      polyfill = response.body
    })

    // all calls will be done via XHR after we load polyfill
    // so we can spy on them using cy.route
    cy.server()
    cy.route('/api/deck/new/**').as('deck')
    cy.route('/api/deck/**/draw/**').as('cards')

    // We use cy.visit({onBeforeLoad: ...}) to delete native fetch and load polyfill code instead
    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
        delete win.fetch
        // since the application code does not ship with a polyfill
        // load a polyfilled "fetch" from the test
        win.eval(polyfill)
        win.fetch = win.unfetch
      },
    })

  });

  it('requests and gets deck', () => {
    cy.wait('@deck').should('have.property', 'status', 200);
    cy.get('@deck').its('response.body').should('have.property', 'remaining', 12); 
  });

  it('requests and gets cards', () => {
    // const cards = Array.from(Array(12), () => '@cards');
    // cy.get('.card').should(card => {
    //   console.log(card)
    // });

    cy.get('.memory-game').children().should('have.length', 12);
  })

  it('finds the content "Memory Game"', () => {
    cy.contains('Memory Game');
  });

})