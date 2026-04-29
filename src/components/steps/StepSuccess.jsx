import StepLayout from "../StepLayout";

export default function StepSuccess({ onClose }) {
  return (
    <div className="tenure-success-shell">
      <h2 className="tenure-success-title">Your enquiry has been sent</h2>

      <p className="tenure-success-intro">
        Thanks for getting in touch. We’ll aim to respond within 48 hours.
      </p>

      <p className="tenure-success-muted">
        This is a contact enquiry only. Your details will not be used for
        marketing communications.
      </p>

      <div className="tenure-success-icon">✓</div>

      <div className="tenure-success-actions">
        <button className="tenure-button" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}