import StepLayout from "../StepLayout";

export default function StepFinalGeneral({ data, updateField, onBack }) {
  return (
    <StepLayout
      title="Tell us where to reply"
      intro="We’ll review your enquiry and point you in the right direction."
      footer={
        <div className="tenure-button-row">
          <button className="tenure-button tenure-button-secondary" type="button" onClick={onBack}>
            Back
          </button>
          <button className="tenure-button" type="button">
            Submit enquiry
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
          <span className="tenure-label">Email address</span>
          <input
            className="tenure-input"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </label>
      </div>
    </StepLayout>
  );
}