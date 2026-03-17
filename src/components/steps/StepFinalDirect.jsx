import StepLayout from "../StepLayout";

export default function StepFinalDirect({ data, updateField, onBack }) {
  return (
    <StepLayout
      title="You look like a strong fit"
      intro="Share your details and we’ll make sure the right person comes back to you directly."
      footer={
        <div className="tenure-button-row">
          <button className="tenure-button tenure-button-secondary" type="button" onClick={onBack}>
            Back
          </button>
          <button className="tenure-button" type="button">
            Request direct contact
          </button>
        </div>
      }
    >
      <div className="tenure-stack">
        <label className="tenure-field">
          <span className="tenure-label">Full name</span>
          <input
            className="tenure-input"
            type="text"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Work email</span>
          <input
            className="tenure-input"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Role</span>
          <input
            className="tenure-input"
            type="text"
            value={data.role}
            onChange={(e) => updateField("role", e.target.value)}
          />
        </label>
      </div>
    </StepLayout>
  );
}