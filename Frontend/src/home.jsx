// src/components/ChoosePathCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="relative w-[630px] sm:w-[960px] h-[680px] rounded-3xl overflow-hidden shadow-2xl">
        <Link
          to="/medical"
          className="group absolute inset-y-0 left-0 w-1/2 flex flex-col items-center justify-center bg-[#ba0000] transition-transform duration-300 hover:-translate-x-1"
        >
          <div className="w-32 h-32 rounded-full bg-neutral-200 group-hover:scale-105 transition-transform" />
          <p className="mt-6 text-lg font-semibold text-white tracking-wide">
            Page Medical
          </p>
        </Link>
        <Link
          to="/education"
          className="group absolute inset-y-0 right-0 w-1/2 flex flex-col items-center justify-center bg-[#210000] transition-transform duration-300 hover:translate-x-1"
        >
          <div className="w-32 h-32 rounded-full bg-neutral-200 group-hover:scale-105 transition-transform" />
          <p className="mt-6 text-lg font-semibold text-white tracking-wide">
            Page Education
          </p>
        </Link>

        {/* heading */}
        <h1 className="absolute top-15 left-1/2 -translate-x-1/2 text-center text-4xl sm:text-5xl font-bold text-white z-10">
          Choose Your Path
        </h1>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -ml-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-14  mix-blend-multiply" />
      </div>
    </div>
  );
}
