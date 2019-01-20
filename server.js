const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/find-songs', (req, res) => {
    const queryParams = req.query;
    let body = [{ UID: "123456", DiscRef: "SF123", Artist: "ABBA", Title: "Waterloo", Key:"B#", Length:"3:26"},
    { UID: "5754", DiscRef: "SF124-01", Artist: "ABBA", Title: "Dancing Queen", Key:"C", Length:"3:04"},
    { UID: "8787", DiscRef: "SF123-03", Artist: "ABC", Title: "The Look of Love pt1", Key:"D", Length:"4:19"},
    { UID: "123475", DiscRef: "SF128-09", Artist: "Spice Girls", Title: "Stop", Key:"B", Length:"3:38"}];

    if ( queryParams.browse === "true" ) {
        // This is a browse query
        console.log( `Browse Query Recieved, query all ${ queryParams.searchby } beginning with ${ queryParams.value }`);

        // TBD:
        // search db and store results in body array

    } else {
        // Standerd search query
        console.log( `Search Query Recieved, query ${ queryParams.searchby } fields containing the value ${ queryParams.value }`);

        // TBD:
        // search db and store results in body array

    }

    res.send( body ).status(200);
});

app.get('/submitted-requests', (req, res ) => {
    console.log("Getting the submitted requests");

    let body = [{
        UID: "123456",
        RequestID: "abc123",
        Singer: "A Singer",
        DiscRef: "MRH87-12",
        Length: "4:07",
        Artist: "Wheatus",
        Title: "Africa",
        Key: "B",
        State: "pending",
        DateTime: "19/01/19 17:48"
    },
    {
        UID: "987654",
        RequestID: "abc987",
        Singer: "Another Singer",
        DiscRef: "SFMW866-01",
        Length: "3:26",
        Artist: "Motorhead",
        Title: "Ace of Spades",
        Key: "F",
        State: "pending",
        DateTime: "19/01/19 17:50"
    },
    {
        UID: "2468",
        RequestID: "qwerty",
        Singer: "A completed Singer",
        DiscRef: "SF001-02",
        Length: "4:14",
        Artist: "Neil Diamond",
        Title: "Sweet Caroline",
        Key: "G",
        DateTime: "19/01/19 17:50",
        State: "completed",
        CompletedDateTime: "19/01/19 19:02"
    }];

    // TBD:
    // search requests db and return all requests

    res.send( body ).status(200);

});

app.post('/new-request', (req, res) =>{
    console.log( "New Request recieved", req.body );
    const newRequest = req.body;

    // TBD:
    // Add DateTime stamp to object
    // Store object in the requests db

    res.send(newRequest).status(200);

});

app.post('/completed-request', ( req, res ) => {
    console.log( "Completed Request recieved", req.body );
    
    // TBD:
    // Add CompletedDateTime stamp to object
    // Store object in the requests db

    res.send( req.body ).status(200);   

});

app.post('/admin-task', ( req, res ) => {
    const task = req.body;

});