
const router = require('express').Router();
const {createNewNote, updateDb} = require("../../lib/noteFunctions");
const { v4: uuidv4 } = require('uuid');
const {notes} = require("../../db/db.json");

router.get("/noteFunctions", (req, res) => {
    let results = notes;
    res.json(results);
  });

  router.post("/noteFunctions", (req, res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  });  

  router.delete("/noteFunctions/:id" , (req, res) => {
    const params = req.params.id
    updateDb(params, notes);
    res.redirect('');
  });

  module.exports = router;