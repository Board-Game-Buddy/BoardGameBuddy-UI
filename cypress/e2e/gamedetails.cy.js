describe('Details Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users', {
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
    cy.intercept('GET', 'https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/13', {
      fixture: 'singlegame',
    }).as('singlegame');
    cy.intercept('GET', 'https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/10/favorites', {
      fixture: 'user10Faves'
    })
  });

  it('should display the header with image, home, and about sections', () => {
    cy.visit('https://board-game-buddy-ui.vercel.app/');
    cy.get('.users-container').children().first().click();
    cy.get('.carousels-container > :nth-child(1)').find('.carousel-title')
    cy.get(':nth-child(1) > .saved-carousel')
    .find('.card').first().click();
    cy.get('nav').should('exist')
    .find('.logo').should('exist');
    cy.get('nav')
    .find('.a').should('exist').should('have.text', "Home")
    cy.get('nav')
    .find('.links > :nth-child(2) > a').should('exist');
    cy.get('.selected-game-info')
    cy.get('.back-button').should("exist")
    cy.get('.game-title').should('have.text', 'Twilight Struggle');
    cy.get('.players').should('have.text', '2-2 players')
    cy.get('.rating').should ('have.text', "Average Rating: 4/5 ⭐⭐⭐⭐⭐")
    cy.get('.selected-game-image').should('have.attr', 'src', 'https://cf.geekdo-images.com/pNCiUUphnoeWOYfsWq0kng__original/img/Iae47UtAd_RXVd5tJ3YzbDHOv4E=/0x0/filters:format(jpeg)/pic3530661.jpg');
    cy.get('.categories').should('have.text', "Modern Warfare, Political, Wargame")
    cy.get('.selected-game-instructions-container').should('exist')
    cy.get('.game-instructions').should('exist') // having trouble asserting the actual text contents here
   })
})

