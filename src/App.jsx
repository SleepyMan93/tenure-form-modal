// src/App.jsx

import { useEffect, useState } from "react";

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
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 99999 }}>
          React Loaded ✅
        </div>
      )}

      {isOpen && (
        <div className="tenure-overlay" onClick={() => setIsOpen(false)}>
          <div className="tenure-modal" onClick={(e) => e.stopPropagation()}>
            <button className="tenure-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <h2>Tenure form modal</h2>
            <p>React is mounted successfully.</p>
          </div>
        </div>
      )}
    </>
  );
}