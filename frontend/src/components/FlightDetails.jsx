import "../styles/FlightDetails.css";

export default function FlightDetails({ flight }) {
    return (
        <div className="flight-details">
            <h2>Flight Details</h2>
            <p><strong>Flight Number:</strong> {flight.flight.iata}</p>
            <p><strong>Date:</strong> {flight.flight_date}</p>
            <p><strong>Airline:</strong> {flight.airline.name}</p>
            <p><strong>Departure:</strong> {flight.departure.airport} ({flight.departure.iata})</p>
            <p><strong>Arrival:</strong> {flight.arrival.airport} ({flight.arrival.iata})</p>
            <p><strong>Status:</strong> {flight.flight_status}</p>
        </div>
    );
}
