describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/', {
      fixture: 'mockUsers',
    }).as('getUsers');
  });

  it('should display the header with image, home, and about sections', () => {
    cy.visit('https://board-game-buddy-ui.vercel.app/');

    cy.get('nav').should('exist')
      .find('.logo').should('exist');
    cy.get('nav')
      .find('.links > :nth-child(1) > a').should('exist');
    cy.get('.users-container').children()
    .should('have.length', 3); // CHANGE THIS TO HOWEVER MANY USERS WE END UP GOING WITH
    
  });
});
