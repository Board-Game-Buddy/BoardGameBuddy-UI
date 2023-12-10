describe('Carousel Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/', {
      fixture: 'mockUsers',
    }).as('getUsers');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games', {
      fixture: 'mockGames',
    }).as('getGames');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/all_by_params?max_players=2', {
      fixture: 'twoplayer',
    }).as('twoplayer');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/all_by_params?categories=fantasy', {
      fixture: 'topfantasy',
    }).as('fantasy');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/all_by_params?categories=strategy', {
      fixture: 'topstrategy',
    }).as('strategy');
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/all_by_params?cooperative=true', {
      fixture: 'coop',
    }).as('coop');
  });

  it('should display the header with image, home, and about sections', () => {
    cy.visit('https://board-game-buddy-ui.vercel.app/');
    cy.get('.users-container').children().first().click();

  });
});


