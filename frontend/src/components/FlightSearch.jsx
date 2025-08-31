import { useState, useEffect } from "react";
import DeleteFlightButton from "./DeleteFlightButton";
import "../styles/FlightSearch.css";

export default function FlightSearch() {
    const [searchNumber, setSearchNumber] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [filteredFlights, setFilteredFlights] = useState([]);

    const normalizeDate = (date) => (date?.includes("T") ? date.split("T")[0] : date);

    // Load flights from localStorage
    const loadFlights = () => {
        const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
        return savedFlights.map((f) => ({ ...f, flight_date: normalizeDate(f.flight_date) }));
    };

    // Filter flights based on search inputs
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        let results = loadFlights();

        if (searchNumber.trim()) {
            results = results.filter(
                (f) => f.flight_number.toLowerCase() === searchNumber.trim().toLowerCase()
            );
        }

        if (searchDate.trim()) {
            results = results.filter((f) => normalizeDate(f.flight_date) === searchDate);
        }

        setFilteredFlights(results);
    };

    // Delete flight
    const handleDelete = (flightToDelete) => {
        let savedFlights = loadFlights();
        savedFlights = savedFlights.filter(
            (f) =>
                !(
                    f.flight_number === flightToDelete.flight_number &&
                    normalizeDate(f.flight_date) === normalizeDate(flightToDelete.flight_date)
                )
        );
        localStorage.setItem("flights", JSON.stringify(savedFlights));
        handleSearch(); // Refresh filtered list
    };

    // Load flights on mount
    useEffect(() => {
        handleSearch();
    }, []);

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
                <button type="submit" className="flight-search-button">
                    Search
                </button>
            </form>

            <h3>Saved Flights:</h3>
            <ul>
                {filteredFlights.length === 0 && <li>No saved flights</li>}
                {filteredFlights.map((f, idx) => (
                    <li key={`${f.flight_number}_${f.flight_date}_${idx}`}>
                        {f.flight_number} - {f.airline} - {normalizeDate(f.flight_date)} (
                        {f.departure_airport} → {f.arrival_airport}) - {f.status}{" "}
                        <DeleteFlightButton onDelete={() => handleDelete(f)} />
                    </li>
                ))}
            </ul>
        </>
    );
}
