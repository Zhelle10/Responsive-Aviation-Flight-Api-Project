require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./errorHandler");
const fetchFlight = require("./fetchFlight");

const app = express();
app.use(cors());
app.use(express.json());

// Fetch flight from external API
app.get("/fetch-flight/:flightNumber", fetchFlight);

// Catch calls to /fetch-flight with no flightNumber
app.get("/fetch-flight", (req, res, next) => {
  const err = new Error("This requires a flight number");
  err.status = 400;
  next(err);
});

// Error handler last
app.use(errorHandler);

app.listen(3001, () => console.log("✅ Backend running on port 3001"));
