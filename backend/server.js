
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const businesses = [
  {
    id: 1,
    name: "Pune Tech Solutions",
    category: "Technology",
    location: "Pune",
    description: "IT support and web development services."
  },
  {
    id: 2,
    name: "Green Leaf Cafe",
    category: "Food",
    location: "Pune",
    description: "Fresh food and beverages."
  },
  {
    id: 3,
    name: "Local Craft Studio",
    category: "Handicrafts",
    location: "Nashik",
    description: "Handmade gifts and local products."
  }
];

app.get("/api/businesses", (req, res) => {
  const { search, category, location } = req.query;
  let results = businesses;

  if (search) {
    results = results.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    results = results.filter((b) =>
      b.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (location) {
    results = results.filter((b) =>
      b.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json(results);
});


app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "healthy",
      service: "LocalBizHub API",
      database: "connected"
    });
  } catch (error) {
    console.error("Health check failed:", error.message);

    res.status(503).json({
      status: "unhealthy",
      database: "disconnected"
    });
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`LocalBizHub API running on port ${PORT}`);
});
