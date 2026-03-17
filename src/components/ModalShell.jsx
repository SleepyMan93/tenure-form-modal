export default function ModalShell({ children, onClose }) {
  return (
    <div
      className="tenure-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tenure enquiry form"
    >
      <div
        className="tenure-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tenure-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}