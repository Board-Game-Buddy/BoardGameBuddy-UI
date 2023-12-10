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
    cy.get('nav').should('exist')
      .find('.logo').should('exist');
    cy.get('nav')
    .find('.a').should('exist').should('have.text', "Home")
    cy.get('nav')
      .find('.links > :nth-child(2) > a').should('exist');

    cy.get('.carousels-container > :nth-child(1)').find('.carousel-title') // assert name of carousel 1
    cy.get(':nth-child(1) > .saved-carousel')
    .find('.card')
    .should('have.length', 20);

    cy.get('.carousels-container > :nth-child(2)').find('.carousel-title') // assert name of carousel 2
    cy.get(':nth-child(2) > .saved-carousel')
    .find('.card')
    .should('have.length', 20);

    cy.get('.carousels-container > :nth-child(3)').find('.carousel-title') // assert name of carousel 3
    cy.get(':nth-child(3) > .saved-carousel')
    .find('.card')
    .should('have.length', 20);

    cy.get('.carousels-container > :nth-child(4)').find('.carousel-title') // assert name of carousel 4
    cy.get(':nth-child(4) > .saved-carousel')
    .find('.card')
    .should('have.length', 20);
    // might want to dig into the carousels and assert id of the first and last card as well?
  });
});


