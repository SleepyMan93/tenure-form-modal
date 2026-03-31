import StepLayout from "../StepLayout";

export default function StepFinalGeneral({
  currentStep,
  totalSteps,
  data,
  errors,
  onChange,
  onBack,
  onSubmit,
}) {
  return (
    <StepLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      title="Tell us where to reply"
      intro="We’ll review your enquiry and point you in the right direction."
      footer={
        <div className="tenure-button-row tenure-button-row-between">
          <button
            className="tenure-button tenure-button-secondary"
            type="button"
            onClick={onBack}
          >
            Back
          </button>

          <button className="tenure-button" type="button" onClick={onSubmit}>
            Submit enquiry
          </button>
        </div>
      }
    >
      <div className="tenure-stack">
        <label className="tenure-field">
          <span className="tenure-label">Full name</span>
          <input
            className={`tenure-input ${errors.fullName ? "has-error" : ""}`}
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Your full name"
          />
          {errors.fullName ? <p className="tenure-error">{errors.fullName}</p> : null}
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Email address</span>
          <input
            className={`tenure-input ${errors.email ? "has-error" : ""}`}
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="name@company.com"
          />
          {errors.email ? <p className="tenure-error">{errors.email}</p> : null}
        </label>
      </div>
    </StepLayout>
  );
}