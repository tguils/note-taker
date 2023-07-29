var PORT = process.env.PORT || 3000;
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

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


//define db data for notes
let notes = [
  {
      "title":"Test Title",
      "text":"Test text"
  }
]

//if db exists - load it
if (fs.existsSync('db/db.json')) {
  var data = fs.readFileSync('db/db.json', 'utf8');
  console.log('data', data)
  try {
    notes = JSON.parse(data);
  } catch (error) {
    console.error('Error grabbing db', error);
  }
}
//save notes - stringify?
 
  var saveNotes = (notes) => {
    console.log('save notes to db', notes);
    fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8');
  };

  // retrieve all notes from api 

  // https://medium.com/@haybams/build-a-restful-api-with-node-js-and-express-js-d7e59c7a3dfb
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

 // create route for new notes
// https://stackoverflow.com/questions/56722040/how-to-push-an-object-into-an-array-in-async-function
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.status(201).json(newNote);
});


 
  // delete notes function