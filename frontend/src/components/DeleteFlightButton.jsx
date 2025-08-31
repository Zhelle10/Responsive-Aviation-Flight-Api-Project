// DeleteFlightButton.jsx
import "../styles/DeleteFlightButton.css";

export default function DeleteFlightButton({ onDelete }) {
    return (
        <button className="delete-flight-button" onClick={onDelete}>
            Delete
        </button>
    );
}
