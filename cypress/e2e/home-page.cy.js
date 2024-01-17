describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users', {
      fixture: 'mockUsers',
    }).as('getUsers');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games', {
      fixture: 'mockGames',
    }).as('getGames');
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/10/favorites').as('intercept')
  });

  it('should display the header and 7 profiles', () => {
    cy.visit('https://board-game-buddy-ui.vercel.app/');

    cy.get('nav').should('exist')
      .find('.logo').should('exist');
    cy.get('nav')
    cy.get('.users-container').children()
    .should('have.length', 3); // CHANGE THIS TO HOWEVER MANY USERS WE END UP GOING WITH THEN UNCOMMENT THE LAST 3 USERS!
    cy.get('.users-container > :nth-child(1)').find('.name').should('have.text', 'Abdul');
    cy.get('.users-container > :nth-child(2)').find('.name').should('have.text', 'Reed');
    cy.get('.users-container > :nth-child(3)').find('.name').should('have.text', 'Lane');
  });
});
