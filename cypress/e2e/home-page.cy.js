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
    .find('.a').should('exist').should('have.text', "Home")
    cy.get('.users-container').children()
    .should('have.length', 7); // CHANGE THIS TO HOWEVER MANY USERS WE END UP GOING WITH THEN UNCOMMENT THE LAST 3 USERS!
    cy.get('.users-container > :nth-child(1)').find('.name').should('have.text', 'Reed');
    cy.get('.users-container > :nth-child(2)').find('.name').should('have.text', 'Patrick');
    cy.get('.users-container > :nth-child(3)').find('.name').should('have.text', 'Prissilla');
    cy.get('.users-container > :nth-child(4)').find('.name').should('have.text', 'Noelle');
    cy.get('.users-container > :nth-child(5)').find('.name').should('have.text', 'Lane');
    cy.get('.users-container > :nth-child(6)').find('.name').should('have.text', 'Abdul');
    cy.get('.users-container > :nth-child(7)').find('.name').should('have.text', 'Connor');
  });
});
