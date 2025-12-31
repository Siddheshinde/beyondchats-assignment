const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("BeyondChats API is running");
});
// GET all articles
app.get("/articles", (req, res) => {
    db.all("SELECT * FROM articles", (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
// GET article by ID
app.get("/articles/:id", (req, res) => {
    const { id } = req.params;
  
    db.get(
      "SELECT * FROM articles WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: "Article not found" });
        }
        res.json(row);
      }
    );
  });
  
  // CREATE new article
app.post("/articles", (req, res) => {
    const { title, content, url, published_date } = req.body;
  
    if (!title || !content || !url) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    db.run(
      `
      INSERT INTO articles (title, content, url, published_date)
      VALUES (?, ?, ?, ?)
      `,
      [title, content, url, published_date],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      }
    );
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
