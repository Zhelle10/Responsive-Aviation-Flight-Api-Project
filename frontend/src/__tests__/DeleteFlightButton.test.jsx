import { render, screen, fireEvent } from "@testing-library/react";
import DeleteFlightButton from "../components/DeleteFlightButton";

describe("<DeleteFlightButton />", () => {
    it("renders with correct text", () => {
        render(<DeleteFlightButton onDelete={() => { }} />);
        expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    });

    it("calls onDelete when clicked", () => {
        const onDelete = vi.fn();
        render(<DeleteFlightButton onDelete={onDelete} />);

        fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
        expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it("applies the CSS class", () => {
        render(<DeleteFlightButton onDelete={() => { }} />);
        const button = screen.getByRole("button", { name: /Delete/i });
        expect(button).toHaveClass("delete-flight-button");
    });
});
