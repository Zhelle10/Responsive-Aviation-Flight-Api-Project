import { render, screen } from "@testing-library/react";
import FlightDetails from "../components/FlightDetails";
import { describe, it, expect } from "vitest";

describe("FlightDetails Component", () => {
    it("renders nothing when no flight is provided", () => {
        const { container } = render(<FlightDetails flight={null} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders flight details when flight data is provided", () => {
        const mockFlight = {
            flight_number: "NZ6025",
            airline: "Air New Zealand",
            departure_airport: "AKL",
            arrival_airport: "WLG",
            status: "active",
            flight_date: "2025-08-18",
        };

        render(<FlightDetails flight={mockFlight} />);

        expect(screen.getByText("Flight Details")).toBeInTheDocument();
        expect(screen.getByText(/NZ6025/)).toBeInTheDocument();
        expect(screen.getByText(/Air New Zealand/)).toBeInTheDocument();
        expect(screen.getByText(/AKL/)).toBeInTheDocument();
        expect(screen.getByText(/WLG/)).toBeInTheDocument();
        expect(screen.getByText(/active/)).toBeInTheDocument();
        expect(screen.getByText(/2025-08-18/)).toBeInTheDocument();
    });

    it("renders N/A for missing fields", () => {
        const incompleteFlight = {
            flight_number: "",
            airline: "",
            departure_airport: "",
            arrival_airport: "",
            status: "",
            flight_date: "",
        };

        render(<FlightDetails flight={incompleteFlight} />);

        expect(screen.getAllByText("N/A")).toHaveLength(6);
    });
});
