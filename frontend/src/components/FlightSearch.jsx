import { useState, useEffect } from "react";
import DeleteFlightButton from "./DeleteFlightButton";
import "../styles/FlightSearch.css";

export default function FlightSearch() {
    const [searchNumber, setSearchNumber] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [filteredFlights, setFilteredFlights] = useState([]);

    // Normalize ISO date
    const normalizeDate = (d) => d?.includes("T") ? d.split("T")[0] : d;

    // Load all flights on mount
    useEffect(() => {
        handleSearch(); // automatically show saved flights
    }, []);

    // Filter flights from localStorage
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
        let results = savedFlights.map(f => ({ ...f, flight_date: normalizeDate(f.flight_date) }));

        if (searchNumber.trim()) {
            results = results.filter(f =>
                f.flight_number?.toLowerCase() === searchNumber.trim().toLowerCase()
            );
        }

        if (searchDate.trim()) {
            results = results.filter(f => normalizeDate(f.flight_date) === searchDate);
        }

        setFilteredFlights(results);
    };

    // Delete flight from localStorage & refresh list
    const handleDelete = (flightToDelete) => {
        let savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
        savedFlights = savedFlights.filter(f =>
            !(f.flight_number === flightToDelete.flight_number &&
                normalizeDate(f.flight_date) === normalizeDate(flightToDelete.flight_date))
        );
        localStorage.setItem("flights", JSON.stringify(savedFlights));
        handleSearch(); // refresh filtered list
    };

    return (
        <>
            <h2>Search Saved Flights</h2>
            <form className="flight-search-form" onSubmit={handleSearch}>
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

            <h3>Saved Flights:</h3>
            <ul>
                {filteredFlights.length === 0 && <li>No saved flights</li>}
                {filteredFlights.map((f, idx) => (
                    <li key={`${f.flight_number}_${f.flight_date}_${idx}`}>
                        {f.flight_number} - {f.airline} - {normalizeDate(f.flight_date)} (
                        {f.departure_airport} → {f.arrival_airport}) - {f.status}{" "}
                        <DeleteFlightButton
                            flight={f}
                            index={idx}
                            flights={filteredFlights}
                            setFlights={() => handleDelete(f)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
