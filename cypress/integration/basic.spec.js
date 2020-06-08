describe('My basic tests', () => {
  it('finds the content "Memory Game"', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Memory Game');
  });

  it ('clicks a card', () => {
    cy.get('.card')
      .first()
      .click()
      .children()
      .should('have.class', 'flip');
  });

  it('clicks two different cards and compare them', () => {
    cy.get('.memory-game')
      .not('.flip')
      .click()
      .should('have.class', 'flip');
  });
})