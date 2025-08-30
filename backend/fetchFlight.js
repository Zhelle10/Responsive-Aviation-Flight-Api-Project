const fetch = require("node-fetch");

async function fetchFlight(req, res, next) {
  const { flightNumber } = req.params;
  const API_KEY = process.env.API_KEY;

  try {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;
    console.log("Fetching from API:", url);

    const response = await fetch(url);
    const json = await response.json();

    if (json.error) {
      const err = new Error(json.error.message);
      err.status = 403;
      throw err;
    }

    if (!json.data || json.data.length === 0) {
      const err = new Error("Flight not found");
      err.status = 404;
      throw err;
    }

    const f = json.data[0];

    // Flatten to match frontend expectations
    const flightData = {
      flight_date: f.flight_date,
      flight_number: f.flight.iata,
      airline: f.airline.name,
      departure_airport: f.departure.iata,
      arrival_airport: f.arrival.iata,
      status: f.flight_status,
    };

    res.json({ flight: flightData });
  } catch (error) {
    next(error);
  }
}

module.exports = fetchFlight;
