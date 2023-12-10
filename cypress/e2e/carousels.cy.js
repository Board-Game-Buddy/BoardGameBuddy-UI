describe('Carousel Page', () => {
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
    cy.get('.users-container').children().first().click();

  });
});


