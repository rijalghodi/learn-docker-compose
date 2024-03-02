const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

// Body parser middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());

let quotes = [];

// Create a new quote
app.post("/quotes", (req, res) => {
  const { text, author } = req.body;
  const newQuote = {
    id: quotes.length + 1,
    text,
    author,
  };
  quotes.push(newQuote);
  res.json(newQuote);
});

// Read all quotes
app.get("/quotes", (req, res) => {
  res.json(quotes);
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Quote App");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
