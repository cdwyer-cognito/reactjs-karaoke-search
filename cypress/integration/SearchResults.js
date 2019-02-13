describe('Search Page', function() { 

  const responseArray = [{ 
    "_id":"5c504bae22ee702058465d0c",
    "UID":"47d4934e-e3ef-07ae-dc68-add189b295fe",
    "Filepath":"D:\\Karaoke\\Sunfly\\Decades\\SFD8011-02 - A Ha - Take On Me.zip",
    "DiscRef":"SFD8011-02",
    "Title":"Take On Me",
    "Artist":"A Ha",
    "Key":"",
    "Length":""
  },{
    "_id":"5c504bae22ee702058465d28",
    "UID":"8b63ed35-fef5-0590-8d69-e49616f5e445",
    "Filepath":"D:\\Karaoke\\Sunfly\\Decades\\SFD8012-05 - Amazulu - Too Good To Be Forgotten.zip",
    "DiscRef":"SFD8012-05","Title":"Too Good To Be Forgotten",
    "Artist":"Amazulu",
    "Key":"",
    "Length":""
  },{
    "_id":"5c504bae22ee702058465d68",
    "UID":"d9d1c86a-5906-b382-c31b-2b46d979c125",
    "Filepath":"D:\\Karaoke\\Sunfly\\Decades\\SFD8016-12 - Ashford & Simpson - Solid.zip",
    "DiscRef":"SFD8016-12",
    "Title":"Solid",
    "Artist":"Ashford & Simpson",
    "Key":"",
    "Length":""
  },{
    "_id":"5c504bae22ee702058465d78",
    "UID":"2ce3f797-8a7e-eebe-cbe4-1e7323d3a418",
    "Filepath":"D:\\Karaoke\\Sound Choice\\SCRAN-27 - ABBA - Does Your Mother Know.zip",
    "DiscRef":"SCRAN-27",
    "Title":"Does Your Mother Know",
    "Artist":"ABBA",
    "Key":"G",
    "Length":"3:15"
  }];


  beforeEach( () => {
    cy.viewport(768, 1024);
  });

  it('User is informed when no songs are found', function() { 
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: []
    });
    cy.visit('http://localhost:3000/search-results?searchby=artist&value=AB132456EFG&browse=false');

    cy.contains("Search Results");
    cy.contains("There are no results to show");

  });

  it('Results are displayed to the user', function() { 
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: responseArray 
    });
    cy.visit('http://localhost:3000/search-results?searchby=artist&value=AB132456EFG&browse=false');

    cy.get('ul[id="resultsList"]').children().should('have.length', 4);

  });

  it('Results can be filtered by user', function() { 
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: responseArray 
    });
    cy.visit('http://localhost:3000/search-results?searchby=artist&value=AB132456EFG&browse=false');

    cy.get('input[placeholder="Filter"]').type('ab');

    cy.get('ul[id="resultsList"]').children().should('have.length', 1);

  });

  it('A filtered can be cleared by the user user', function() { 
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/submitted-requests',
      response: []
    });
    cy.route({
      method: 'GET',
      url: '/api/find-songs*',
      response: responseArray 
    });
    cy.visit('http://localhost:3000/search-results?searchby=artist&value=AB132456EFG&browse=false');

    cy.get('input[placeholder="Filter"]').type('ab');

    cy.get('button').contains('X').click();

    cy.get('ul[id="resultsList"]').children().should('have.length', 4);

  });




});