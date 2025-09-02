// Mock DeleteFlightButton to avoid dependency
vi.mock("../components/DeleteFlightButton", () => ({
    default: ({ onDelete }) => (
        <button onClick={onDelete} data-testid="delete-btn">Delete</button>
    ),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearch from "../components/FlightSearch";

describe("<FlightSearch />", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("renders with no saved flights", () => {
        render(<FlightSearch />);
        expect(screen.getByText(/No saved flights/i)).toBeInTheDocument();
    });

    it("displays flights from localStorage", () => {
        const flights = [
            {
                flight_number: "AB123",
                airline: "Air Test",
                departure_airport: "JFK",
                arrival_airport: "LAX",
                status: "On Time",
                flight_date: "2025-09-01T00:00:00Z",
            },
        ];
        localStorage.setItem("flights", JSON.stringify(flights));

        render(<FlightSearch />);
        expect(screen.getByText(/AB123 - Air Test/i)).toBeInTheDocument();
    });

    it("filters flights by number", () => {
        const flights = [
            { flight_number: "AB123", airline: "Air Test", flight_date: "2025-09-01", departure_airport: "JFK", arrival_airport: "LAX", status: "On Time" },
            { flight_number: "CD456", airline: "FlyHigh", flight_date: "2025-09-01", departure_airport: "SFO", arrival_airport: "ORD", status: "Delayed" },
        ];
        localStorage.setItem("flights", JSON.stringify(flights));

        render(<FlightSearch />);
        fireEvent.change(screen.getByLabelText(/Flight Number/i), { target: { value: "AB123" } });
        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        expect(screen.getByText(/AB123 - Air Test/i)).toBeInTheDocument();
        expect(screen.queryByText(/CD456 - FlyHigh/i)).not.toBeInTheDocument();
    });

    it("filters flights by date", () => {
        const flights = [
            { flight_number: "AB123", airline: "Air Test", flight_date: "2025-09-01", departure_airport: "JFK", arrival_airport: "LAX", status: "On Time" },
            { flight_number: "CD456", airline: "FlyHigh", flight_date: "2025-09-02", departure_airport: "SFO", arrival_airport: "ORD", status: "Delayed" },
        ];
        localStorage.setItem("flights", JSON.stringify(flights));

        render(<FlightSearch />);
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2025-09-01" } });
        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        expect(screen.getByText(/AB123 - Air Test/i)).toBeInTheDocument();
        expect(screen.queryByText(/CD456 - FlyHigh/i)).not.toBeInTheDocument();
    });

    it("deletes a flight", () => {
        const flights = [
            { flight_number: "AB123", airline: "Air Test", flight_date: "2025-09-01", departure_airport: "JFK", arrival_airport: "LAX", status: "On Time" },
        ];
        localStorage.setItem("flights", JSON.stringify(flights));

        render(<FlightSearch />);
        expect(screen.getByText(/AB123 - Air Test/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("delete-btn"));

        expect(screen.queryByText(/AB123 - Air Test/i)).not.toBeInTheDocument();
        expect(localStorage.getItem("flights")).not.toContain("AB123");
    });
});
