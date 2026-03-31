import StepLayout from "../StepLayout";

export default function StepOne({
  currentStep,
  totalSteps,
  data,
  errors,
  onToggleProduct,
  onChange,
  onNext,
  productOptions,
  existingBenefitsOptions,
  urgencyOptions,
  employeeSizeOptions,
}) {
  return (
    <StepLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      title="What are you looking for help with?"
      intro="A few quick details will help guide you to the right next step."
      footer={
        <div className="tenure-button-row tenure-button-row-end">
          <button className="tenure-button" type="button" onClick={onNext}>
            Continue
          </button>
        </div>
      }
    >
      <div className="tenure-step-one-grid">
        <div className="tenure-field tenure-field-full">
          <span className="tenure-label">What products are you interested in?</span>

          <div className="tenure-pill-grid">
            {productOptions.map((product) => {
              const isActive = data.productsInterested.includes(product);

              return (
                <button
                  key={product}
                  type="button"
                  className={`tenure-pill ${isActive ? "is-active" : ""}`}
                  onClick={() => onToggleProduct(product)}
                >
                  {product}
                </button>
              );
            })}
          </div>

          {errors.productsInterested ? (
            <p className="tenure-error">{errors.productsInterested}</p>
          ) : null}
        </div>

        <label className="tenure-field">
          <span className="tenure-label">
            Do you have any benefit products in place currently?
          </span>
          <select
            className={`tenure-input ${errors.existingBenefitsStatus ? "has-error" : ""}`}
            value={data.existingBenefitsStatus}
            onChange={(e) => onChange("existingBenefitsStatus", e.target.value)}
          >
            <option value="">Select one</option>
            {existingBenefitsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {errors.existingBenefitsStatus ? (
            <p className="tenure-error">{errors.existingBenefitsStatus}</p>
          ) : null}
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Urgency</span>
          <select
            className={`tenure-input ${errors.urgency ? "has-error" : ""}`}
            value={data.urgency}
            onChange={(e) => onChange("urgency", e.target.value)}
          >
            <option value="">Select one</option>
            {urgencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {errors.urgency ? (
            <p className="tenure-error">{errors.urgency}</p>
          ) : null}
        </label>

        <label className="tenure-field">
          <span className="tenure-label">Employee size</span>
          <select
            className={`tenure-input ${errors.employeeSize ? "has-error" : ""}`}
            value={data.employeeSize}
            onChange={(e) => onChange("employeeSize", e.target.value)}
          >
            <option value="">Select one</option>
            {employeeSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {errors.employeeSize ? (
            <p className="tenure-error">{errors.employeeSize}</p>
          ) : null}
        </label>
      </div>
    </StepLayout>
  );
}