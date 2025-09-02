import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlightLookup from "../components/FlightLookup";

global.fetch = vi.fn();

describe("<FlightLookup />", () => {
    let setFlight, setError, setLoading;

    beforeEach(() => {
        setFlight = vi.fn();
        setError = vi.fn();
        setLoading = vi.fn();
        localStorage.clear();
        fetch.mockReset();
    });

    it("renders input and button", () => {
        render(
            <FlightLookup
                setFlight={setFlight}
                setError={setError}
                setLoading={setLoading}
            />
        );

        expect(screen.getByPlaceholderText(/Enter flight number/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
    });

    it("shows error when submitting empty input", () => {
        render(
            <FlightLookup
                setFlight={setFlight}
                setError={setError}
                setLoading={setLoading}
            />
        );

        fireEvent.submit(screen.getByRole("form", { name: /flight lookup form/i }));
        expect(setError).toHaveBeenCalledWith("Please enter a flight number");
    });

    it("fetches flight successfully", async () => {
        const mockFlight = {
            flight_number: "PR123",
            airline: "TestAir",
            flight_date: "2025-09-01T00:00:00Z",
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ flight: mockFlight }),
        });

        render(
            <FlightLookup
                setFlight={setFlight}
                setError={setError}
                setLoading={setLoading}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter flight number/i), {
            target: { value: "PR123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        await waitFor(() => {
            expect(setLoading).toHaveBeenCalledWith(true);
            expect(setFlight).toHaveBeenCalledWith({
                ...mockFlight,
                flight_date: "2025-09-01",
            });
            expect(localStorage.getItem("flights")).toContain("PR123");
        });
    });

    it("handles fetch error", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: { message: "Flight not found" } }),
        });

        render(
            <FlightLookup
                setFlight={setFlight}
                setError={setError}
                setLoading={setLoading}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter flight number/i), {
            target: { value: "XX999" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith("Flight not found");
        });
    });
});
