import "../styles/DeleteFlightButton.css";

export default function DeleteFlightButton({ flight, index, flights, setFlights }) {
    const handleDelete = () => {
        const flightKey = `${flight.flight_number}_${flight.flight_date}_${index}`;

        const updatedFlights = flights.filter(
            (f, i) => `${f.flight_number}_${f.flight_date}_${i}` !== flightKey
        );

        setFlights(updatedFlights);
        localStorage.setItem("flights", JSON.stringify(updatedFlights));
    };

    return (
        <button className="delete-flight-button" onClick={handleDelete}>
            Delete
        </button>
    );
}
  