import React, { useState, useEffect } from "react";
const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000); // Oculta la pantalla de carga después de 3 segundos
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-gray-900 text-white flex justify-center items-center transition-opacity ${visible ? "opacity-100" : "opacity-0"
        }`}
      style={{ transitionDuration: "3.9s" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="currentColor"
        className="bi bi-arrow-repeat animate-spin"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
        />
        <path
          fillRule="evenodd"
          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182a.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;
