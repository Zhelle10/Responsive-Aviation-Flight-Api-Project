import { useState, useEffect } from "react";
import DeleteFlightButton from "../components/DeleteFlightButton";
import "../styles/FlightSearch.css";

export default function FlightSearch() {
    const [searchNumber, setSearchNumber] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [filteredFlights, setFilteredFlights] = useState([]);

    const normalizeDate = (date) => (date?.includes("T") ? date.split("T")[0] : date || "");

    const loadFlights = () => {
        const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
        return savedFlights.map((f) => ({ ...f, flight_date: normalizeDate(f.flight_date) }));
    };

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
        handleSearch();
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <>
            <h2>Search Saved Flights</h2>
            <form
                className="flight-search-form"
                onSubmit={handleSearch}
                aria-label="flight search form"
            >
                <label htmlFor="flight-number" className="visually-hidden">Flight Number</label>
                <input
                    id="flight-number"
                    type="text"
                    placeholder="Flight Number"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    className="flight-search-input"
                />

                <label htmlFor="flight-date" className="visually-hidden">Date</label>
                <input
                    id="flight-date"
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
                        <DeleteFlightButton onDelete={() => handleDelete(f)} />
                    </li>
                ))}
            </ul>
        </>
    );
}
