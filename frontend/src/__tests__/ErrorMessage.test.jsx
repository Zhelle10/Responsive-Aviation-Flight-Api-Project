import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

describe("<ErrorMessage />", () => {
    it("renders the error message text", () => {
        render(<ErrorMessage message="Something went wrong" />);
        expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
    });

    it("applies the error-message CSS class", () => {
        render(<ErrorMessage message="Invalid input" />);
        const errorElement = screen.getByText(/Invalid input/i);
        expect(errorElement).toHaveClass("error-message");
    });
});
