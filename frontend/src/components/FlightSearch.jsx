import { useState } from "react";
import "../styles/FlightSearch.css";

export default function FlightSearch({ setSearchResults, setError, setLoading }) {
    const [searchNumber, setSearchNumber] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const searchFlights = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSearchResults([]);

        try {
            const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];

            let filtered = savedFlights;
            if (searchNumber.trim()) {
                filtered = filtered.filter(f =>
                    f.flight_number.toLowerCase() === searchNumber.toLowerCase()
                );
            }
            if (searchDate.trim()) {
                filtered = filtered.filter(f => f.flight_date === searchDate);
            }

            setSearchResults(filtered);
        } catch (err) {
            setError("Failed to search saved flights");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Search Saved Flights</h2>
            <form className="flight-search-form" onSubmit={searchFlights}>
                <input
                    type="text"
                    placeholder="Flight Number"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    className="flight-search-input"
                />
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="flight-search-date"
                />
                <button type="submit" className="flight-search-button">Search</button>
            </form>
        </>
    );
}
