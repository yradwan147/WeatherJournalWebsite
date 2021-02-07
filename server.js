// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
 
//Initialize Port
const port = 8000;

// Setup Server
const server = app.listen(port, ()=> console.log(`Server running on ${port}`))

//Post route to add new entries
app.post('/addEntry', (req, res)=>{
    let newEntry = {
        date : req.body.date,
        temperature : req.body.temperature,
        usrResp : req.body.usrResp,
    }
    console.log(newEntry)
    projectData.push(newEntry)
})

//Get route for dynamically changing UI
app.get('/all', (req, res) => {
    res.send(projectData[projectData.length-1]);
    console.log(projectData[projectData.length-1])
})