function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="tenure-progress" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isActive = isComplete || isCurrent;

        return (
          <div className="tenure-progress-segment" key={stepNumber}>
            <div
              className={[
                "tenure-progress-dot",
                isActive ? "is-active" : "",
                isComplete ? "is-complete" : "",
                isCurrent ? "is-current" : "",
              ].join(" ")}
            >
              {isComplete ? "✓" : stepNumber}
            </div>

            {stepNumber < totalSteps ? (
              <div
                className={[
                  "tenure-progress-line",
                  stepNumber < currentStep ? "is-active" : "",
                ].join(" ")}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function StepLayout({
  currentStep = 1,
  totalSteps = 3,
  title,
  intro,
  children,
  footer,
}) {
  return (
    <div className="tenure-step-shell">
      <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="tenure-step-header">
        <div className="tenure-step-kicker">
          Step {currentStep} of {totalSteps}
        </div>
        <h2 className="tenure-step-title">{title}</h2>
        {intro ? <p className="tenure-step-intro">{intro}</p> : null}
      </div>

      <div className="tenure-step-card">{children}</div>

      {footer ? <div className="tenure-step-footer">{footer}</div> : null}
    </div>
  );
}