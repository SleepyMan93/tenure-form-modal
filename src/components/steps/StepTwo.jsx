import StepLayout from "../StepLayout";

export default function StepTwo({ data, updateField, onBack, onNext }) {
  return (
    <StepLayout
      title="A bit more context"
      intro="A little detail helps us point you to the right person faster."
      footer={
        <div className="tenure-button-row">
          <button className="tenure-button tenure-button-secondary" type="button" onClick={onBack}>
            Back
          </button>
          <button className="tenure-button" type="button" onClick={onNext}>
            Continue
          </button>
        </div>
      }
    >
      <div className="tenure-stack">
        <label className="tenure-field">
          <span className="tenure-label">Company name</span>
          <input
            className="tenure-input"
            type="text"
            value={data.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Website</span>
          <input
            className="tenure-input"
            type="text"
            value={data.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Notes</span>
          <textarea
            className="tenure-input tenure-textarea"
            value={data.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </label>
      </div>
    </StepLayout>
  );
}