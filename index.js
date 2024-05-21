const express = require("express");
const cors = require("cors");
const summarizeText = require("./summarize");

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Serve static files from the 'docs' directory
app.use(express.static("docs"));

app.use(express.json());

app.post("/summarize", (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then((response) => {
      res.send({ summary: response });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send("Error summarizing text");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
