const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.json());

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