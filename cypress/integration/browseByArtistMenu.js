describe('Browse By Artist Page', function() {

  const _buttons = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
      'O','P','Q','R','S','T','U','V','W','X','Y','Z','0-9' ];

  before(function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    })
  });

  it('I can see the full alphabet', function(){

    cy.visit('http://localhost:3000/browse/by-artist');

    

    for ( let button of _buttons ) {
      cy.get('button').contains( button );
    }

  })

  it('I browse by Artist', function(){
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: [
      ]
    }).as('searchRequest');

    cy.visit('http://localhost:3000/browse/by-artist');

    let button  = _buttons[Math.floor(Math.random()* _buttons.length)];

    cy.get('button').contains( button ).click();

    cy.wait('@searchRequest', { timeout: 10000 });

    cy.url().should('eq', 'http://localhost:3000/search-results?searchby=artist&value=' + button +'&browse=true');

    cy.contains("Results");

  });

  it('User can switch to DJ mode from the Browse by Artist Menu', function() {
    
    cy.visit('http://localhost:3000/browse/by-artist');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

  });

  it('User can enter DJ mode from the Browse by Artist Menu', function() {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/api/admin-task',
      response: {
        token: "ABC123"
      }
    })
    
    cy.visit('http://localhost:3000/browse/by-artist');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

    cy.get('input[type="password"]').type("123456");
    cy.get('button').contains('Log In').click();

    cy.contains("Admin").should('be.visible');
    cy.contains("Requests").should('be.visible');

  });


});