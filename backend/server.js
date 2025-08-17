require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");
const errorHandler = require("./errorHandler");
const fetchFlight = require("./fetchFlight");

const app = express();
app.use(cors());
app.use(express.json());

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

  // Inject db into req
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Fetch flight from external API and save
  app.get("/fetch-flight/:flightNumber", fetchFlight);

  // Search flights
  app.get("/search", async (req, res, next) => {
    const { flightNumber, date } = req.query;
    let query = `SELECT * FROM flights WHERE 1=1`;
    let params = [];

    if (flightNumber) {
      query += ` AND flight_number = ?`;
      params.push(flightNumber.toUpperCase());
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

  // Catch calls to /fetch-flight with no flightNumber
  app.get("/fetch-flight", (req, res, next) => {
    const err = new Error("This requires a flight number");
    err.status = 400;
    next(err);
  });

  // Error handler last
  app.use(errorHandler);

  app.listen(3001, () => console.log("✅ Backend running on port 3001"));
}

start();
