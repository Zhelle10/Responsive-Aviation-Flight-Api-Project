import { useState } from "react";
import "../styles/FlightSearch.css";

export default function FlightSearch({ setSearchResults, setError, setLoading }) {
    const [searchNumber, setSearchNumber] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const searchFlights = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSearchResults([]);

        try {
            let query = [];
            if (searchNumber.trim()) query.push(`flightNumber=${encodeURIComponent(searchNumber)}`);
            if (searchDate.trim()) query.push(`date=${encodeURIComponent(searchDate)}`);

            const res = await fetch(`http://localhost:3001/search?${query.join("&")}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error?.message || "Failed to search flights");
            }
            const data = await res.json();
            setSearchResults(data);
        } catch (err) {
            setError(err.message);
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
