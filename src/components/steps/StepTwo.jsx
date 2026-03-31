import StepLayout from "../StepLayout";

function getWordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export default function StepTwo({
  currentStep,
  totalSteps,
  data,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const wordCount = getWordCount(data.extraQuestions);

  return (
    <StepLayout
      // totalSteps={totalSteps}
      title="A bit more context"
      intro="This helps us tailor the conversation and point you to the right person faster."
      currentStep={currentStep}
      footer={
        <div className="tenure-button-row tenure-button-row-between">
          <button
            className="tenure-button tenure-button-secondary"
            type="button"
            onClick={onBack}
          >
            Back
          </button>

          <button className="tenure-button" type="button" onClick={onNext}>
            Continue
          </button>
        </div>
      }
    >
      <div className="tenure-row">
        <label className="tenure-field">
          <span className="tenure-label">Company name</span>
          <input
            className={`tenure-input ${errors.companyName ? "has-error" : ""}`}
            type="text"
            maxLength={75}
            value={data.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="Enter your company name"
          />
          {errors.companyName ? <p className="tenure-error">{errors.companyName}</p> : null}
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Website</span>
          <input
            className={`tenure-input ${errors.website ? "has-error" : ""}`}
            type="text"
            value={data.website}
            onChange={(e) => onChange("website", e.target.value)}
            placeholder="company.com"
          />
          {errors.website ? <p className="tenure-error">{errors.website}</p> : null}
        </label>
      </div>
      <div className="tenure-stack">
        <label className="tenure-field">
          <span className="tenure-label">Anything else you'd like to ask?</span>
          <textarea
            className={`tenure-input tenure-textarea ${errors.extraQuestions ? "has-error" : ""}`}
            value={data.extraQuestions}
            onChange={(e) => onChange("extraQuestions", e.target.value)}
            placeholder="Add any extra context here"
          />

          <div className="tenure-field-meta">
            <span className={wordCount > 250 ? "tenure-meta-error" : ""}>
              {wordCount}/250 words
            </span>
          </div>

          {errors.extraQuestions ? (
            <p className="tenure-error">{errors.extraQuestions}</p>
          ) : null}
        </label>
      </div>
    </StepLayout>
  );
}