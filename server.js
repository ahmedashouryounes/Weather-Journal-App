// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


/* Setup Server */
// Setup port to use
const port = 3000;
const server = app.listen(port, listening);
// listening function used above in app.listen
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/getData', (req, res) => {
    res.send(projectData);
});



// POST route
app.post('/addData', (req,res) => {
    const {temperature, date, userResponse} = req.body
    projectData = {
        temperature,
        date,
        userResponse
    }
    console.log(projectData)
    res.send();
});

