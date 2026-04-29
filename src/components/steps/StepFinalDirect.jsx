import StepLayout from "../StepLayout";

export default function StepFinalDirect({
  currentStep,
  totalSteps,
  data,
  errors,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}) {
  return (
    <StepLayout
      title="You look like a strong fit"
      intro="Share your details and we’ll make sure the right person comes back to you directly."
      currentStep={currentStep}
      totalSteps={totalSteps}
      footer={
        <div className="tenure-button-row tenure-button-row-between">
          <div>
                      <p className="tenure-consent">
            This is a contact enquiry only. Your details will not be used for marketing communications.
          </p>
          </div>
          <button
            className="tenure-button tenure-button-secondary"
            type="button"
            onClick={onBack}
          >
            Back
          </button>

          <button
            className="tenure-button"
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Request direct contact"}
          </button>
          {submitError ? <p className="tenure-submit-error">{submitError}</p> : null}
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
          <span className="tenure-label">Work email</span>
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

      <div className="tenure-row">
        <label className="tenure-field">
          <span className="tenure-label">Role</span>
          <input
            className={`tenure-input ${errors.role ? "has-error" : ""}`}
            type="text"
            value={data.role}
            onChange={(e) => onChange("role", e.target.value)}
            placeholder="People Manager"
          />
          {errors.role ? <p className="tenure-error">{errors.role}</p> : null}
        </label>
      </div>
    </StepLayout>
  );
}