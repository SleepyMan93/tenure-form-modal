import StepLayout from "../StepLayout";

export default function StepSuccess({ leadType, onClose }) {
    return (
        <StepLayout
            currentStep={3}
            totalSteps={3}
            title="Your enquiry has been sent"
            intro="Thanks for getting in touch. We’ll aim to respond within 48 hours."
            footer={
                <div className="tenure-button-row tenure-button-row-end">
                    <button className="tenure-button" type="button" onClick={onClose}>
                        Close
                    </button>
                </div>
            }
        >
            <div className="tenure-success-card">
                <div className="tenure-success-icon">✓</div>

                <p>
                    {leadType === "direct"
                        ? "Your enquiry has been sent directly to the Tenure team."
                        : "Your enquiry has been sent to the Tenure enquiries inbox."}
                </p>

                <p className="tenure-success-muted">
                    This is a contact enquiry only. Your details will not be used for
                    marketing communications.
                </p>
            </div>
        </StepLayout>
    );
}