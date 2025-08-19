import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlightSearch from "../components/FlightSearch"; // adjust path if needed
import { vi } from "vitest";

describe("FlightSearch Component", () => {
    let setSearchResults;
    let setError;
    let setLoading;

    beforeEach(() => {
        setSearchResults = vi.fn();
        setError = vi.fn();
        setLoading = vi.fn();

        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("performs a successful search", async () => {
        const fakeData = [
            {
                flight_number: "AB123",
                airline: "AirTest",
                departure_airport: "AAA",
                arrival_airport: "BBB",
                status: "On Time",
                flight_date: "2025-08-16",
            },
        ];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeData,
        });

        render(
            <FlightSearch
                setSearchResults={setSearchResults}
                setError={setError}
                setLoading={setLoading}
            />
        );

        // get inputs
        const flightInput = screen.getByPlaceholderText("Flight Number");
        const dateInput = screen.getByRole("textbox", { name: "" }) || screen.getByDisplayValue("");
        const searchButton = screen.getByRole("button", { name: /search/i });

        // fill inputs
        fireEvent.change(flightInput, { target: { value: "AB123" } });
        fireEvent.change(screen.getByDisplayValue(""), { target: { value: "2025-08-16" } });

        // submit form
        fireEvent.click(searchButton);

        // wait for fetch to be called
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:3001/search?flightNumber=AB123&date=2025-08-16"
            );
        });

        // verify callbacks
        await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalledWith(fakeData);
            expect(setError).not.toHaveBeenCalled();
            expect(setLoading).toHaveBeenCalledTimes(2); // true + false
        });
    });

    it("shows error when fetch fails", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: { message: "Flight not found" } }),
        });

        render(
            <FlightSearch
                setSearchResults={setSearchResults}
                setError={setError}
                setLoading={setLoading}
            />
        );

        fireEvent.change(screen.getByPlaceholderText("Flight Number"), { target: { value: "XYZ" } });
        fireEvent.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith("Flight not found");
            expect(setSearchResults).not.toHaveBeenCalled();
            expect(setLoading).toHaveBeenCalledTimes(2);
        });
    });
});
