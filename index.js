const express = require('express');
const summarizeText = require('./summarize.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Error summarizing text');
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
