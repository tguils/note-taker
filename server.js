const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

https://expressjs.com/en/resources/middleware/body-parser.html
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// joining index.html on the route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  // joining notes.html on the  route
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });

  //to do:
  //if notes exist - load them
  //save notes - stringify?
  // retrieve all notes from api
  // create route for new notes
  // delete notes function