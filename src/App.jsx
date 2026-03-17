import { useEffect, useState } from "react";
import ModalShell from "./components/ModalShell";
import MultiStepForm from "./components/MultiStepForm";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClick(event) {
      const trigger = event.target.closest("[data-tenure-form-trigger]");
      if (!trigger) return;

      event.preventDefault();
      setIsOpen(true);
    }

    function handleKeydown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <div className="tenure-debug-pill">
          Tenure React Loaded
        </div>
      )}

      {isOpen && (
        <ModalShell onClose={() => setIsOpen(false)}>
          <MultiStepForm onClose={() => setIsOpen(false)} />
        </ModalShell>
      )}
    </>
  );
}