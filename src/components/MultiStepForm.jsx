import { useMemo, useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepFinalGeneral from "./steps/StepFinalGeneral";
import StepFinalDirect from "./steps/StepFinalDirect";

export const PRODUCT_OPTIONS = [
  "Private Medical Insurance",
  "Dental Insurance",
  "Health Cash Plan",
  "Life Insurance",
  "Income Protection",
  "Critical Illness Cover",
  "Employee Assistance Programme",
  "Virtual GP",
  "Health Screening",
  "Pension",
  "Cycle to Work",
];

export const EXISTING_BENEFITS_OPTIONS = [
  "We already have most of these in place",
  "We have some of these in place",
  "We don’t have these in place",
  "We currently offer no benefits at all",
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

    const hostParts = host.split(".");
    const tld = hostParts[hostParts.length - 1];

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

  if (!Array.isArray(data.productsInterested) || data.productsInterested.length < 1) {
    errors.productsInterested = "Please select at least one product.";
  }

  if (!String(data.existingBenefitsStatus || "").trim()) {
    errors.existingBenefitsStatus = "Please choose an option.";
  }

  if (!String(data.urgency || "").trim()) {
    errors.urgency = "Please select your urgency.";
  }

  if (!String(data.employeeSize || "").trim()) {
    errors.employeeSize = "Please select employee size.";
  }

  return errors;
}

function validateStepTwo(data) {
  const errors = {};
  const companyName = String(data.companyName || "").trim();
  const website = String(data.website || "").trim();
  const extraQuestions = String(data.extraQuestions || "").trim();

  if (!companyName) {
    errors.companyName = "Please enter your company name.";
  } else if (companyName.length < 5) {
    errors.companyName = "Company name must be at least 5 characters.";
  } else if (companyName.length > 75) {
    errors.companyName = "Company name must be 75 characters or fewer.";
  }

  if (!website) {
    errors.website = "Please enter your website.";
  } else if (!isLikelyValidWebsite(website)) {
    errors.website = "Please enter a valid website, such as company.com.";
  }

  if (extraQuestions && getWordCount(extraQuestions) > 250) {
    errors.extraQuestions = "Please keep this to 250 words or fewer.";
  }

  return errors;
}

function validateFinalGeneral(data) {
  const errors = {};
  const fullName = String(data.fullName || "").trim();
  const email = String(data.email || "").trim();

  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Please enter a valid name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

function validateFinalDirect(data) {
  const errors = validateFinalGeneral(data);
  const role = String(data.role || "").trim();

  if (!role) {
    errors.role = "Please enter your role.";
  } else if (role.length < 2) {
    errors.role = "Please enter a valid role.";
  }

  return errors;
}

export default function MultiStepForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const leadPath = useMemo(() => getLeadPath(formData), [formData]);
  const totalSteps = 3;

  function updateField(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function toggleProduct(product) {
    setFormData((prev) => {
      const exists = prev.productsInterested.includes(product);

      return {
        ...prev,
        productsInterested: exists
          ? prev.productsInterested.filter((item) => item !== product)
          : [...prev.productsInterested, product],
      };
    });

    setErrors((prev) => ({
      ...prev,
      productsInterested: "",
    }));
  }

  function nextFromStepOne() {
    const nextErrors = validateStepOne(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep(2);
  }

  function nextFromStepTwo() {
    const nextErrors = validateStepTwo(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep(3);
  }

  function prevStep() {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  }

  function submitGeneral() {
    const nextErrors = validateFinalGeneral(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log("Submitting general enquiry:", {
      leadType: "general",
      ...formData,
    });

    alert("General enquiry submit is wired for validation. Submission endpoint comes next.");
    onClose?.();
  }

  function submitDirect() {
    const nextErrors = validateFinalDirect(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log("Submitting direct contact:", {
      leadType: "direct",
      ...formData,
    });

    alert("Direct contact submit is wired for validation. Submission endpoint comes next.");
    onClose?.();
  }

  const sharedStepProps = {
    currentStep: step,
    totalSteps,
  };

  if (step === 1) {
    return (
      <StepOne
        {...sharedStepProps}
        data={formData}
        errors={errors}
        onToggleProduct={toggleProduct}
        onChange={updateField}
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
        {...sharedStepProps}
        data={formData}
        errors={errors}
        onChange={updateField}
        onBack={prevStep}
        onNext={nextFromStepTwo}
      />
    );
  }

  if (leadPath === "direct") {
    return (
      <StepFinalDirect
        {...sharedStepProps}
        data={formData}
        errors={errors}
        onChange={updateField}
        onBack={prevStep}
        onSubmit={submitDirect}
      />
    );
  }

  return (
    <StepFinalGeneral
      {...sharedStepProps}
      data={formData}
      errors={errors}
      onChange={updateField}
      onBack={prevStep}
      onSubmit={submitGeneral}
    />
  );
}