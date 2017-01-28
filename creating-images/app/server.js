// Importing modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// initialize app, and get port to listen on
const app = express();
const PORT = process.env.PORT || 4000;

// paths for the home page and notes file
const homePage = path.join(__dirname, 'views', 'index.html');
const notesPath = path.join(__dirname, 'data', 'notes.json');

// Read a file from the given path
const readFile = (path) => {
  return fs.readFileSync(path);
};

// Write data to a given path
const writeFile = (data, path) => {
  fs.writeFileSync(path, data);
}

// Use body parsing middleware, for parsing forms
app.use(bodyParser.urlencoded({ extended: true }));

// GET /
// Home page with notes and form
app.get('/', (req, res) => {
  res.sendFile(homePage);
});

// GET /notes
// Get the JSON list of notes
app.get('/notes', (req, res) => {
  const notes = readFile(notesPath);
  res.send(notes);
});

// POST /notes
// Post a note to the notes file
app.post('/notes', (req, res) => {
  const note = {
    content: req.body.content,
  };
  const notes = JSON.parse(readFile(notesPath));

  notes.push(note);
  writeFile(JSON.stringify(notes), notesPath);

  res.redirect('/');
});

app.listen(PORT, () => `This app is now running on port ${PORT}`);
