const fetch = require("node-fetch");

async function fetchFlight(req, res, next) {
  const { flightNumber } = req.params;
  const API_KEY = "95158d5ee4b8d2922fc9297441abfd14";

  try {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;
    console.log("Fetching from API:", url);

    const response = await fetch(url);
    const json = await response.json();

    if (json.error) {
      console.error("API Error:", json.error);
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

    await req.db.run(
      `INSERT INTO flights (flight_date, flight_number, airline, departure_airport, arrival_airport, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        f.flight_date,
        f.flight.iata,
        f.airline.name,
        f.departure.iata,
        f.arrival.iata,
        f.flight_status,
      ]
    );

    res.json({ message: "Flight saved", flight: f });
  } catch (error) {
    next(error);
  }
}

module.exports = fetchFlight;
