describe('Search Page', function() { 

  beforeEach( () => {
    cy.viewport(768, 1024);
    cy.visit('http://localhost:3000/search');
  });

  it('User can not submit a search with less then three characters', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.get('input[type="text"]').type("AB");

    cy.get('button').contains('Submit').should('be.disabled');

    cy.get('input[type="text"]').should('have.class', 'Input__Invalid__38X2d');


  });

  it('User can clear the search field by clicking the Clear button', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });

    cy.get('input[type="text"]').type("AB132456EFG");

    cy.get('button').contains('Clear').click();

    cy.get('input[type="text"]').should('have.value', "");

  });

  it('Ticker is visable when there are 3 requests', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: [
        {
          Title: "Title 1",
          Aritst: "Artist 1"
        },
        {
          Title: "Title 2",
          Aritst: "Artist 2"
        },
        {
          Title: "Title 3",
          Aritst: "Artist 3"
        }
      ]
    }).as('getRequests');

    cy.visit('http://localhost:3000/search');
    cy.wait('@getRequests', { timeout: 180000 }).its('url').should('include', 'submitted-requests');

    cy.contains("Requested:").should('be.visible');

  })

  it('Ticker is not visable when there are less than 3 requests', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: [
        {
          Title: "Title 1",
          Aritst: "Artist 1"
        },
        {
          Title: "Title 2",
          Aritst: "Artist 2"
        }
      ]
    }).as('getRequests');

    cy.visit('http://localhost:3000/search');
    cy.wait('@getRequests', { timeout: 180000 }).its('url').should('include', 'submitted-requests');

    cy.contains("Requested:").should('not.be.visible');

  });

  it('User can submit a search by artist', function() {
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
    cy.visit('http://localhost:3000/search');

    cy.get('input[type="text"]').type("AB132456EFG");

    cy.get('button').contains('By Artist').click();
    cy.get('button').contains('By Artist').should('have.class', 'Button__Selected__3vGbU');

    cy.get('button').contains('Submit').click();

    cy.wait('@searchRequest', { timeout: 10000 });

    cy.url().should('eq', 'http://localhost:3000/search-results?searchby=artist&value=AB132456EFG&browse=false');

    cy.contains("Results");

  });

  it('User can submit a search by title', function() {
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
    cy.visit('http://localhost:3000/search');

    cy.get('input[type="text"]').type("AB132456EFG");

    cy.get('button').contains('By Title').click();
    cy.get('button').contains('By Title').should('have.class', 'Button__Selected__3vGbU');

    cy.get('button').contains('Submit').click();

    cy.wait('@searchRequest', { timeout: 10000 });

    cy.url().should('eq', 'http://localhost:3000/search-results?searchby=title&value=AB132456EFG&browse=false');

    cy.contains("Results");

  });

  it('User can submit a search by both artist and title', function() {
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
    cy.visit('http://localhost:3000/search');

    cy.get('input[type="text"]').type("AB132456EFG");

    cy.get('button').contains('Both').click();
    cy.get('button').contains('Both').should('have.class', 'Button__Selected__3vGbU');

    cy.get('button').contains('Submit').click();

    cy.wait('@searchRequest', { timeout: 10000 });

    cy.url().should('eq', 'http://localhost:3000/search-results?searchby=both&value=AB132456EFG&browse=false');

    cy.contains("Results");

  });

  it('User can switch to DJ mode from the Search Menu', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    
    cy.visit('http://localhost:3000/search');

    for( let i = 0 ; i < 9 ; i++ ) {
      cy.get('div[class="Toolbar__Logo__24rue"]').find("img").click();
    }
    
    cy.contains("Switch to DJ Mode").should('be.visible');

  });

  it('User can enter DJ mode from the Search Menu', function() {

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
    
    cy.visit('http://localhost:3000/search');

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