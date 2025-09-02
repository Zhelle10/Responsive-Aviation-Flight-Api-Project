import { render, screen } from "@testing-library/react";
import FlightDetails from "../components/FlightDetails";

describe("<FlightDetails />", () => {
    it("renders nothing when flight is null", () => {
        const { container } = render(<FlightDetails flight={null} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders flight details when flight data is provided", () => {
        const mockFlight = {
            flight_number: "AB123",
            airline: "Air Test",
            departure_airport: "JFK",
            arrival_airport: "LAX",
            status: "On Time",
            flight_date: "2025-09-01",
        };

        render(<FlightDetails flight={mockFlight} />);

        expect(screen.getByText("Flight Details")).toBeInTheDocument();
        expect(screen.getByText(/AB123/)).toBeInTheDocument();
        expect(screen.getByText(/Air Test/)).toBeInTheDocument();
        expect(screen.getByText(/JFK/)).toBeInTheDocument();
        expect(screen.getByText(/LAX/)).toBeInTheDocument();
        expect(screen.getByText(/On Time/)).toBeInTheDocument();
        expect(screen.getByText(/2025-09-01/)).toBeInTheDocument();
    });

    it("renders N/A when fields are missing", () => {
        const mockFlight = {}; // no fields

        render(<FlightDetails flight={mockFlight} />);

        const flightNumberP = screen.getByText(/Flight Number:/).closest("p");
        expect(flightNumberP).toHaveTextContent("Flight Number: N/A");

        const airlineP = screen.getByText(/Airline:/).closest("p");
        expect(airlineP).toHaveTextContent("Airline: N/A");

        const departureP = screen.getByText(/Departure:/).closest("p");
        expect(departureP).toHaveTextContent("Departure: N/A");

        const arrivalP = screen.getByText(/Arrival:/).closest("p");
        expect(arrivalP).toHaveTextContent("Arrival: N/A");

        const statusP = screen.getByText(/Status:/).closest("p");
        expect(statusP).toHaveTextContent("Status: N/A");

        const dateP = screen.getByText(/Date:/).closest("p");
        expect(dateP).toHaveTextContent("Date: N/A");
    });
});
