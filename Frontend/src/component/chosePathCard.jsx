import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/pixelCanvas.js";

export default function ChoosePortal() {
  const navigate = useNavigate();

  const selectPortal = (dir) => {
    const left = document.querySelector(".portal-left");
    const right = document.querySelector(".portal-right");
    if (dir === "left") {
      left?.classList.add("selected");
      right?.classList.add("not-selected");
      setTimeout(() => navigate("/medical"), 1000);
    } else {
      right?.classList.add("selected");
      left?.classList.add("not-selected");
      setTimeout(() => navigate("/education"), 1000);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="portal-body flex flex-col md:flex-row h-screen overflow-hidden text-white font-['Work_Sans']">
      <button
        className="portal portal-left group relative flex-1 min-h-[48vh] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-blue-300 transition-transform hover:scale-[1.01] active:scale-100"
        onClick={() => selectPortal("left")}
      >
        <pixel-canvas
          class="absolute inset-0 h-full w-full"
          data-gap="6"
          data-speed="35"
          data-colors="#7dd3fc,#38bdf8,#0ea5e9"
        />
        <div className="portal-content relative z-10 flex flex-col items-center justify-center gap-4">
          <svg
            className="w-16 sm:w-20 lg:w-24"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              d="M50,40 L150,40 L150,70 L80,70 L80,85 L140,85 L140,115 L80,115 L80,130 L150,130 L150,160 L50,160 Z"
              fill="#fff"
            />
          </svg>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Ekzaria NGO
          </h2>
        </div>
      </button>
      <button
        className="portal portal-right group relative flex-1 min-h-[48vh] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 transition-transform hover:scale-[1.01] active:scale-100"
        onClick={() => selectPortal("right")}
      >
        <pixel-canvas
          class="absolute inset-0 h-full w-full"
          data-gap="6"
          data-speed="35"
          data-colors="#fef08a,#fde047,#eab308"
        />
        <div className="portal-content relative z-10 flex flex-col items-center justify-center gap-4">
          <svg className="h-24 w-24 mb-6" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="60" fill="#fff" />
            <path
              d="M80,80 L120,120 M80,120 L120,80"
              stroke="#fff"
              strokeWidth="8"
            />
          </svg>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Donation Platform
          </h2>
        </div>
      </button>
    </div>
  );
}
