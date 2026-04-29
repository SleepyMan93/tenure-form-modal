import { useMemo, useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepFinalGeneral from "./steps/StepFinalGeneral";
import StepFinalDirect from "./steps/StepFinalDirect";
import StepSuccess from "./steps/StepSuccess";

export const PRODUCT_OPTIONS = [
  "Private Medical Insurance",
  "Dental Insurance",
  "Health Cash Plan",
  "Group Life Insurance",
  "Group Income Protection",
  "Group Critical Illness",
  "Employee Assistance Programme",
  "Pension",
  "Cycle to Work",
  "Corporate Protection",
];

export const EXISTING_BENEFITS_OPTIONS = [
  "Not yet",
  "Yes, but interested in reviewing or expanding",
];

export const URGENCY_OPTIONS = [
  "Just exploring",
  "Within 3 months",
  "ASAP",
];

export const EMPLOYEE_SIZE_OPTIONS = [
  "0-5",
  "6-10",
  "10-50",
  "50+",
];

const ENQUIRY_API_URL = "https://tenure-form-modal.vercel.app/api/enquiry";

const initialFormData = {
  productsInterested: [],
  existingBenefitsStatus: "",
  urgency: "",
  employeeSize: "",

  companyName: "",
  website: "",
  extraQuestions: "",

  fullName: "",
  email: "",
  role: "",
};

function getLeadPath(data) {
  const highIntent =
    data.urgency === "ASAP" ||
    data.employeeSize === "50+" ||
    data.productsInterested.length >= 4;

  return highIntent ? "direct" : "general";
}

function getWordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function isLikelyValidWebsite(value) {
  const input = String(value || "").trim();
  if (!input) return false;

  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    const url = new URL(withProtocol);
    const host = url.hostname;

    if (!host || !host.includes(".")) return false;

    const tld = host.split(".").pop();
    return /^[a-z]{2,}$/i.test(tld);
  } catch {
    return false;
  }
}

function isValidEmail(value) {
  const input = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

function validateStepOne(data) {
  const errors = {};

  if (!data.productsInterested.length) {
    errors.productsInterested = "Please select at least one product.";
  }

  if (!data.existingBenefitsStatus) {
    errors.existingBenefitsStatus = "Please choose an option.";
  }

  if (!data.urgency) {
    errors.urgency = "Please select your urgency.";
  }

  if (!data.employeeSize) {
    errors.employeeSize = "Please select employee size.";
  }

  return errors;
}

function validateStepTwo(data) {
  const errors = {};
  const companyName = data.companyName.trim();
  const website = data.website.trim();

  if (companyName && companyName.length < 5) {
    errors.companyName = "Company name must be at least 5 characters.";
  }

  if (companyName.length > 75) {
    errors.companyName = "Company name must be 75 characters or fewer.";
  }

  if (website && !isLikelyValidWebsite(website)) {
    errors.website = "Please enter a valid website.";
  }

  if (data.extraQuestions && getWordCount(data.extraQuestions) > 250) {
    errors.extraQuestions = "Please keep this to 250 words or fewer.";
  }

  return errors;
}

function validateFinalGeneral(data) {
  const errors = {};

  if (!data.fullName.trim() || data.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

function validateFinalDirect(data) {
  const errors = validateFinalGeneral(data);

  if (!data.role || data.role.length < 2) {
    errors.role = "Please enter your role.";
  }

  return errors;
}

export default function MultiStepForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const leadPath = useMemo(() => getLeadPath(formData), [formData]);

  if (isSubmitted) {
    return <StepSuccess leadType={leadPath} onClose={onClose} />;
  }

  function updateField(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function toggleProduct(product) {
    setFormData((prev) => {
      const exists = prev.productsInterested.includes(product);

      return {
        ...prev,
        productsInterested: exists
          ? prev.productsInterested.filter((p) => p !== product)
          : [...prev.productsInterested, product],
      };
    });
  }

  function nextFromStepOne() {
    const nextErrors = validateStepOne(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep(2);
  }

  function nextFromStepTwo() {
    const nextErrors = validateStepTwo(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep(3);
  }

  function prevStep() {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  }

  function submitGeneral() {
    const nextErrors = validateFinalGeneral(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    sendForm("general");
  }

  function submitDirect() {
    const nextErrors = validateFinalDirect(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    sendForm("direct");
  }

  async function sendForm(type) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(ENQUIRY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          leadType: type,
        }),
      });

      if (!res.ok) throw new Error();

      setIsSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const shared = {
    currentStep: step,
    totalSteps: 3,
    data: formData,
    errors,
    onChange: updateField,
    isSubmitting,
    submitError,
  };

  if (step === 1) {
    return (
      <StepOne
        {...shared}
        onToggleProduct={toggleProduct}
        onNext={nextFromStepOne}
        productOptions={PRODUCT_OPTIONS}
        existingBenefitsOptions={EXISTING_BENEFITS_OPTIONS}
        urgencyOptions={URGENCY_OPTIONS}
        employeeSizeOptions={EMPLOYEE_SIZE_OPTIONS}
      />
    );
  }

  if (step === 2) {
    return (
      <StepTwo
        {...shared}
        onBack={prevStep}
        onNext={nextFromStepTwo}
      />
    );
  }

  if (leadPath === "direct") {
    return (
      <StepFinalDirect
        {...shared}
        onBack={prevStep}
        onSubmit={submitDirect}
      />
    );
  }

  return (
    <StepFinalGeneral
      {...shared}
      onBack={prevStep}
      onSubmit={submitGeneral}
    />
  );
}