const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// This will parse the body of incoming POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Read the votes from the file
let votes = JSON.parse(fs.readFileSync('votes.json', 'utf8'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// This is the route that the form POSTs to
app.post('/submit-vote', (req, res) => {
  if (req.body.vote) {
    votes[req.body.vote]++;
    fs.writeFileSync('votes.json', JSON.stringify(votes));
    res.json(votes);
  } else {
    res.status(400).json({ error: 'No option selected' });
  }
});

// This is the route for displaying the vote counts
app.get('/results', (req, res) => {
  res.send(votes);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});