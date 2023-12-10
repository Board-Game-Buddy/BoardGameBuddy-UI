describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/', {
      fixture: 'mockUsers',
    }).as('getUsers');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games', {
      fixture: 'mockGames',
    }).as('getUsers');
  });

  it('should display the header with image, home, and about sections', () => {
    cy.visit('https://board-game-buddy-ui.vercel.app/');

    cy.get('nav').should('exist')
      .find('.logo').should('exist');
    cy.get('nav')
      .find('.links > :nth-child(1) > a').should('exist');
    cy.get('.users-container').children()
    .should('have.length', 3); // CHANGE THIS TO HOWEVER MANY USERS WE END UP GOING WITH THEN UNCOMMENT THE LAST 3 USERS!
    cy.get('.users-container > :nth-child(1)').find('.name').should('have.text', 'Reed Hillmar');
    cy.get('.users-container > :nth-child(2)').find('.name').should('have.text', 'Noelle Hemphill');
    cy.get('.users-container > :nth-child(3)').find('.name').should('have.text', 'Connor Richmond');
    // cy.get('.users-container > :nth-child(4)').find('.name').should('have.text', 'Lane Bretschneider');
    // cy.get('.users-container > :nth-child(5)').find('.name').should('have.text', 'Prissilla Escobar');
    // cy.get('.users-container > :nth-child(6)').find('.name').should('have.text', 'Patrick Eitel');
  });
});