describe('Home Page', function() {

  
  it('Home page will load', function() {

    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000');

    cy.contains("Digital Song Book");
  })

  it('Unknown Page will redirect to home', function() {

    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000/abc123');

    cy.contains("Digital Song Book");
  });

  it('User can switch to DJ mode from the Home Page', function() {

    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    
    cy.visit('http://localhost:3000');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

  });

  it('User can enter DJ mode from the Home Page', function() {

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
    
    cy.visit('http://localhost:3000');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

    cy.get('input[type="password"]').type("123456");
    cy.get('button').contains('Log In').click();

    cy.contains("Admin").should('be.visible');
    cy.contains("Requests").should('be.visible');

  });


  it('User can navigate to Seach by clickeing the Home Page', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000');

    cy.get('main').click();
    cy.contains("Search");
    cy.url().should('include', '/search');

  });

  it('User can navigate to Seach by clickeing the Search Button', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000');

    cy.contains('Search').click();
    cy.contains("Search");
    cy.url().should('include', '/search');

  });

  it('User can navigate to Browse by Artist by clickeing the Browse by Artist Button', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.visit('http://localhost:3000');

    cy.contains('Browse by Artist').click();
    cy.contains("Browse by Artist");
    cy.url().should('include', '/browse/by-artist');

  });

  it('User can navigate to Browse by Title by clickeing the Browse by Title Button', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    
    cy.visit('http://localhost:3000');

    cy.contains('Browse by Title').click();
    cy.contains("Browse by Title");
    cy.url().should('include', '/browse/by-title');

  });

})