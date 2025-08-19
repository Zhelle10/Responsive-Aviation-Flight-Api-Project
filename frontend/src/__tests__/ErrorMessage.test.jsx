import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";
import { describe, it, expect } from "vitest";

describe("ErrorMessage Component", () => {
    it("renders the error message text", () => {
        render(<ErrorMessage message="Something went wrong" />);
        expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
    });

    it("renders with the correct CSS class", () => {
        const { container } = render(<ErrorMessage message="Oops" />);
        const paragraph = container.querySelector("p");
        expect(paragraph).toHaveClass("error-message");
    });

    it("handles empty error messages", () => {
        render(<ErrorMessage message="" />);
        expect(screen.getByText("Error:")).toBeInTheDocument();
    });
});
