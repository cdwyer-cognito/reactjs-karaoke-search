describe('Browse By Title Page', function() {

  const _buttons = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
      'O','P','Q','R','S','T','U','V','W','X','Y','Z','0-9' ];

  it('I can see the full alphabet', function(){

    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000/browse/by-title');

    

    for ( let button of _buttons ) {
      cy.get('button').contains( button );
    }

  })

  it('I browse by Title', function(){
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: [
      ]
    }).as('searchRequest');
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000/browse/by-title');

    let button  = _buttons[Math.floor(Math.random()* _buttons.length)];

    cy.get('button').contains( button ).click();

    cy.wait('@searchRequest', { timeout: 10000 });

    cy.url().should('eq', 'http://localhost:3000/search-results?searchby=title&value=' + button +'&browse=true');

    cy.contains("Results");

  });

  it('User can switch to DJ mode from the Browse by Title Menu', function() {

    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    
    cy.visit('http://localhost:3000/browse/by-title');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

  });

  it('User can enter DJ mode from the Browse by Title Menu', function() {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/api/admin-task',
      response: {
        token: "ABC123"
      }
    });
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    
    cy.visit('http://localhost:3000/browse/by-title');

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