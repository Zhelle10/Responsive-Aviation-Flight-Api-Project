export default function FlightDetails({ flight }) {
    if (!flight) return null;

    return (
        <div className="flight-details">
            <h2>Flight Details</h2>
            <p><strong>Flight Number:</strong> {flight.flight_number || "N/A"}</p>
            <p><strong>Airline:</strong> {flight.airline || "N/A"}</p>
            <p><strong>Departure:</strong> {flight.departure_airport || "N/A"}</p>
            <p><strong>Arrival:</strong> {flight.arrival_airport || "N/A"}</p>
            <p><strong>Status:</strong> {flight.status || "N/A"}</p>
            <p><strong>Date:</strong> {flight.flight_date || "N/A"}</p>
        </div>
    );
}
  