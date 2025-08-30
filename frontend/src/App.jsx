import { useState, useEffect } from "react";
import FlightLookup from "./components/FlightLookup";
import FlightSearch from "./components/FlightSearch";
import FlightDetails from "./components/FlightDetails";
import ErrorMessage from "./components/ErrorMessage";
import DeleteFlightButton from "./components/DeleteFlightButton";
import "./styles/App.css";

export default function App() {
  const [flight, setFlight] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load flights from localStorage on mount
  useEffect(() => {
    const savedFlights = JSON.parse(localStorage.getItem("flights") || "[]");
    setSearchResults(savedFlights);
  }, []);

  // Save flights to localStorage whenever searchResults change
  useEffect(() => {
    localStorage.setItem("flights", JSON.stringify(searchResults));
  }, [searchResults]);

  // Generate unique key for list items
  const getFlightKey = (f, index) =>
    f.flight_number + "_" + f.flight_date + "_" + index;

  return (
    <div className="app-container">
      <h1>Flight Tracker App</h1>

      <FlightLookup
        setFlight={setFlight}
        setError={setError}
        setLoading={setLoading}
      />
      {error && <ErrorMessage message={error} />}
      {loading && <p>Loading...</p>}
      {flight && <FlightDetails flight={flight} />}

      <hr className="separator" />

      <FlightSearch
        setSearchResults={setSearchResults}
        setError={setError}
        setLoading={setLoading}
      />

      {searchResults.length > 0 ? (
        <ul className="search-results-list">
          {searchResults.map((f, index) => (
            <li key={getFlightKey(f, index)} className="search-result-item">
              <span>
                {f.flight_number} — {f.airline} — {f.departure_airport} to{" "}
                {f.arrival_airport} — {f.status} — {f.flight_date}
              </span>
              <DeleteFlightButton
                flight={f}
                index={index}
                flights={searchResults}
                setFlights={setSearchResults}
              />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No flights found</p>
      )}
    </div>
  );
}
