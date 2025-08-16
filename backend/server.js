const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");
const errorHandler = require("./errorHandler");
const fetchFlight = require("./fetchFlight"); // import the handler
const deleteFlight = require("./deleteFlight"); // import delete handler

const app = express();
app.use(cors());
app.use(express.json()); // needed for parsing JSON if we later use POST/PUT

async function start() {
  const db = await open({
    filename: "flights.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      flight_date TEXT,
      flight_number TEXT,
      airline TEXT,
      departure_airport TEXT,
      arrival_airport TEXT,
      status TEXT,
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Middleware to inject db into req
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Fetch flight route
  app.get("/fetch-flight/:flightNumber", fetchFlight);

  // Search flights
  app.get("/search", async (req, res, next) => {
    const { flightNumber, date } = req.query;
    let query = `SELECT * FROM flights WHERE 1=1`;
    let params = [];

    if (flightNumber) {
      query += ` AND flight_number = ?`;
      params.push(flightNumber);
    }
    if (date) {
      query += ` AND flight_date = ?`;
      params.push(date);
    }

    try {
      const rows = await db.all(query, params);
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });

  // Delete flight by id
  app.delete("/flights/:id", deleteFlight);

  // Test route to simulate 400 error
  app.get("/fetch-flight", (req, res, next) => {
    console.log("Test-400 route called"); // DEBUG
    const err = new Error("This requires a flight number");
    err.status = 400;
    next(err);
  });

  // Error handler middleware must come last
  app.use(errorHandler);

  app.listen(3001, () => console.log("Backend running on port 3001"));
}

start();
