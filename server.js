var PORT = process.env.PORT || 3000;
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

https://expressjs.com/en/resources/middleware/body-parser.html
var app = express();

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
//define db data for notes

let notes = [
  {
      "title":"Test Title",
      "text":"Test text"
  }
]

  //if db exists - load it
if (fs.existsSync('db/db.json')) {
  const data = fs.readFileSync('db/db.json', 'utf8');
  console.log('data', data)
  try {
    notes = JSON.parse(data);
  } catch (error) {
    console.error('Error grabbing db', error);
  }
}
  //save notes - stringify?
  // retrieve all notes from api
  // create route for new notes
  // delete notes function