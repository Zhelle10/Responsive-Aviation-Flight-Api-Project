import { useState } from "react";
import "../styles/FlightLookup.css";

export default function FlightLookup({ setFlight, setError, setLoading }) {
    const [flightNumber, setFlightNumber] = useState("");

    const fetchFlight = async () => {
        setLoading(true);
        setError("");
        setFlight(null);

        try {
            const res = await fetch(`http://localhost:3001/fetch-flight/${flightNumber}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error?.message || "Failed to fetch flight");
            }
            const data = await res.json();
            setFlight(data.flight);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!flightNumber.trim()) {
            setError("Please enter a flight number");
            return;
        }
        fetchFlight();
    };

    return (
        <form className="flight-lookup-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Enter flight number e.g. 3763"
                className="flight-lookup-input"
            />
            <button type="submit" className="flight-lookup-button">Search</button>
        </form>
    );
}
