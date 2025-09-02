import { useState } from "react";
import "../styles/FlightLookup.css";

export default function FlightLookup({ setFlight, setError, setLoading }) {
    const [flightNumber, setFlightNumber] = useState("");

    const normalizeDate = (d) => (d?.includes("T") ? d.split("T")[0] : d || "");

    const fetchFlight = async () => {
        setLoading(true);
        setError("");
        setFlight(null);

        try {
            const res = await fetch(`http://localhost:3001/fetch-flight/${flightNumber}`);
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error?.message || "Failed to fetch flight");
            }
            const data = await res.json();
            const flight = data.flight;

            flight.flight_date = normalizeDate(flight.flight_date);

            setFlight(flight);

            const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
            const exists = savedFlights.some(
                (f) =>
                    f.flight_number === flight.flight_number &&
                    normalizeDate(f.flight_date) === flight.flight_date
            );
            if (!exists) {
                savedFlights.push(flight);
                localStorage.setItem("flights", JSON.stringify(savedFlights));
                window.dispatchEvent(new Event("flightsUpdated"));
            }
        } catch (err) {
            setError(err.message || "Error fetching flight");
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
        <form
            className="flight-lookup-form"
            onSubmit={handleSubmit}
            aria-label="flight lookup form"
        >
            <label htmlFor="flight-number" className="visually-hidden">
                Flight Number
            </label>
            <input
                id="flight-number"
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Enter flight number e.g. PR123"
                className="flight-lookup-input"
            />
            <button type="submit" className="flight-lookup-button">
                Search
            </button>
        </form>
    );
}
