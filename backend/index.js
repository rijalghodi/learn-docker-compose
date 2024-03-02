const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.BACKEND_PORT;

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Body parser middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Route to create a new quote
app.post("/quotes", async (req, res) => {
  const { text, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO quotes (text, author) VALUES ($1, $2) RETURNING *",
      [text, author]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating quote:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the quote" });
  }
});

// Route to read all quotes
app.get("/quotes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quotes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error reading quotes:", error);
    res.status(500).json({ error: "An error occurred while reading quotes" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Quote App");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
