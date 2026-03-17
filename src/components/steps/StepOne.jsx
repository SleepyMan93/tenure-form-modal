import StepLayout from "../StepLayout";

export default function StepOne({ data, updateField, onNext }) {
  return (
    <StepLayout
      title="What are you looking for help with?"
      intro="We’ll use this to guide you to the most relevant next step."
      footer={
        <button className="tenure-button" type="button" onClick={onNext}>
          Continue
        </button>
      }
    >
      <div className="tenure-stack">
        <label className="tenure-field">
          <span className="tenure-label">Service interest</span>
          <select
            className="tenure-input"
            value={data.service}
            onChange={(e) => updateField("service", e.target.value)}
          >
            <option value="">Select one</option>
            <option value="benefits-strategy">Benefits strategy</option>
            <option value="renewal-support">Renewal support</option>
            <option value="hiring-support">Hiring support</option>
          </select>
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Urgency</span>
          <select
            className="tenure-input"
            value={data.urgency}
            onChange={(e) => updateField("urgency", e.target.value)}
          >
            <option value="">Select one</option>
            <option value="normal">Just exploring</option>
            <option value="soon">Within a few months</option>
            <option value="urgent">Need help soon</option>
          </select>
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Budget range</span>
          <select
            className="tenure-input"
            value={data.budget}
            onChange={(e) => updateField("budget", e.target.value)}
          >
            <option value="">Select one</option>
            <option value="low">Unsure / smaller scope</option>
            <option value="mid">Mid-range project</option>
            <option value="high">Larger / strategic project</option>
          </select>
        </label>
      </div>
    </StepLayout>
  );
}