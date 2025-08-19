import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlightLookup from "../components/FlightLookup.jsx";
import { vi } from "vitest";

describe("FlightLookup Component", () => {
    let mockSetFlight, mockSetError, mockSetLoading;

    beforeEach(() => {
        // Create fresh mock functions before each test
        mockSetFlight = vi.fn();
        mockSetError = vi.fn();
        mockSetLoading = vi.fn();
    });

    it("renders input and button", () => {
        render(
            <FlightLookup
                setFlight={mockSetFlight}
                setError={mockSetError}
                setLoading={mockSetLoading}
            />
        );

        expect(
            screen.getByPlaceholderText(/Enter flight number/i)
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
    });

    it("shows error if submitting empty input", () => {
        render(
            <FlightLookup
                setFlight={mockSetFlight}
                setError={mockSetError}
                setLoading={mockSetLoading}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        expect(mockSetError).toHaveBeenCalledWith("Please enter a flight number");
    });

    it("fetches flight data successfully", async () => {
        // Mock fetch to return fake flight data
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        message: "Flight saved",
                        flight: {
                            flight_number: "NZ6025",
                            airline: "Air New Zealand",
                            status: "active",
                        },
                    }),
            })
        );

        render(
            <FlightLookup
                setFlight={mockSetFlight}
                setError={mockSetError}
                setLoading={mockSetLoading}
            />
        );

        // Enter a flight number
        fireEvent.change(screen.getByPlaceholderText(/Enter flight number/i), {
            target: { value: "NZ6025" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        // Wait for fetch to resolve
        await waitFor(() =>
            expect(mockSetFlight).toHaveBeenCalledWith({
                flight_number: "NZ6025",
                airline: "Air New Zealand",
                status: "active",
            })
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:3001/fetch-flight/NZ6025"
        );
    });
});
