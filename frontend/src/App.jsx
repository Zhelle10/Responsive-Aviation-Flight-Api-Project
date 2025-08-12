import { useState } from "react";
import FlightLookup from "./components/FlightLookup";
import FlightSearch from "./components/FlightSearch";
import FlightDetails from "./components/FlightDetails";
import ErrorMessage from "./components/ErrorMessage";
import "./styles/App.css";

export default function App() {
  const [flight, setFlight] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      <h1>Flight App</h1>
      <FlightLookup setFlight={setFlight} setError={setError} setLoading={setLoading} />
      {error && <ErrorMessage message={error} />}
      {loading && <p>Loading...</p>}
      {flight && <FlightDetails flight={flight} />}

      <hr className="separator" />

      <FlightSearch setSearchResults={setSearchResults} setError={setError} setLoading={setLoading} />
      {searchResults.length > 0 ? (
        <ul className="search-results-list">
          {searchResults.map((f) => (
            <li key={f.id}>
              {f.flight_number} — {f.airline} — {f.departure_airport} to {f.arrival_airport} — {f.status} — {f.flight_date}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No flights found</p>
      )}
    </div>
  );
}
