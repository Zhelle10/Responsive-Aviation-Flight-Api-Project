import "../styles/ErrorMessage.css";

export default function ErrorMessage({ message }) {
    return (
        <p className="error-message">
            Error: {message}
        </p>
    );
}
