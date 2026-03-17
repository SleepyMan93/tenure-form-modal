export default function StepLayout({
  title,
  intro,
  children,
  footer,
}) {
  return (
    <div className="tenure-step-shell">
      <div className="tenure-step-header">
        <h2 className="tenure-step-title">{title}</h2>
        {intro ? <p className="tenure-step-intro">{intro}</p> : null}
      </div>

      <div className="tenure-step-card">
        {children}
      </div>

      {footer ? (
        <div className="tenure-step-footer">
          {footer}
        </div>
      ) : null}
    </div>
  );
}