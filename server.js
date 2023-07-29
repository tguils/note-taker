var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser'); 

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());


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
  const data = fs.readFileSync('db/db.json', 'utf8');
  console.log('data', data)
  try {
    notes = JSON.parse(data);
  } catch (error) {
    console.error('Error grabbing db', error);
  }
}

// Save notes to notes.json file
const saveNotes = (notes) => {
  console.log('save notes to db', notes);
  fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8');
};

 // retrieve all notes from api 
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

// API endpoint to create a new note
app.post('/api/notes', async (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
});
 
  // delete notes function
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const index = notes.findIndex((note) => JSON.stringify(note.id) === noteId);
    
    if (index !== -1) {
      notes.splice(index, 1);
      saveNotes(notes);
      res.status(200).json({ message: 'Note deleted!.' });
    } else {
      res.status(404).json({ message: 'Note not found.' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});