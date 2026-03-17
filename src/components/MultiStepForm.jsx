import { useMemo, useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepFinalGeneral from "./steps/StepFinalGeneral";
import StepFinalDirect from "./steps/StepFinalDirect";

const initialFormData = {
  service: "",
  companySize: "",
  urgency: "",
  budget: "",
  companyName: "",
  website: "",
  notes: "",
  fullName: "",
  email: "",
  role: "",
};

function getLeadPath(data) {
  const highIntent =
    data.budget === "high" ||
    data.urgency === "urgent";

  return highIntent ? "direct" : "general";
}

export default function MultiStepForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const leadPath = useMemo(() => getLeadPath(formData), [formData]);

  function updateField(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => Math.max(1, prev - 1));
  }

  if (step === 1) {
    return (
      <StepOne
        data={formData}
        updateField={updateField}
        onNext={nextStep}
      />
    );
  }

  if (step === 2) {
    return (
      <StepTwo
        data={formData}
        updateField={updateField}
        onBack={prevStep}
        onNext={nextStep}
      />
    );
  }

  if (leadPath === "direct") {
    return (
      <StepFinalDirect
        data={formData}
        updateField={updateField}
        onBack={prevStep}
        onClose={onClose}
      />
    );
  }

  return (
    <StepFinalGeneral
      data={formData}
      updateField={updateField}
      onBack={prevStep}
      onClose={onClose}
    />
  );
}