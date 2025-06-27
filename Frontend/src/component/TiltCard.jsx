// components/TiltCard.jsx
"use client";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

/**
 * Golden-rim tilt card → now **emerald-rim (#00D284)**
 * --------------------------------------------------
 * Props
 * ─ bg       – background image URL
 * ─ title    – main heading
 * ─ subtitle – small line under title
 * ─ badge    – pill top-right (text)
 * ─ onTour   – callback when “Take the tour” pressed
 */
const ACCENT = "#00D284";          // primary green
const ACCENT_DARK = "#006B52";     // deeper shade for shadows / text

export default function TiltCard({ bg, title, subtitle, badge, onTour }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    VanillaTilt.init(el, {
      max: 10,
      speed: 500,
      perspective: 1800,
      glare: true,
      "max-glare": 0.1,
      scale: 1.03,
      reset: true,
    });
    return () => el.vanillaTilt?.destroy();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ backgroundImage: `url(${bg})` }}
      className="relative mt-10 block w-full max-w-[380px] aspect-[9/15.5] rounded-[1.75rem] overflow-hidden cursor-grab bg-cover bg-center shadow-[0_0_0_2px_rgba(0,210,132,0.45),0_0_25px_8px_rgba(0,210,132,0.20)] transition-transform duration-[600ms] ease-[cubic-bezier(.23,1,.32,1)] will-change-transform"
    >
      {/* emerald rim */}
      <div
        className="absolute inset-3.5 rounded-[1.375rem] border border-[rgba(0,210,132,0.25)] shadow-[inset_0.5px_0.5px_1.5px_rgba(200,255,235,0.6),inset_-1px_-1px_1px_rgba(0,120,75,.5),inset_3px_3px_6px_rgba(0,0,0,.25)] pointer-events-none will-change-transform"
        data-tilt-transform-element
      />

      {/* gradient (unchanged) */}
      <div
        className="absolute bottom-0 inset-x-0 h-[95%] bg-gradient-to-t from-[rgba(10,10,10,0.9)] via-[rgba(10,10,10,0.65)] to-transparent pointer-events-none z-10 will-change-transform"
        data-tilt-transform-element
      />

      {/* badge */}
 

      {/* content */}
      <div
        className="absolute inset-3.5 z-20 flex flex-col items-center justify-end text-center text-slate-50 will-change-transform"
        data-tilt-transform-element
      >
        <h1 className="font-serif text-3xl font-bold flex items-center gap-2 mb-2">
          {/* <svg className="h-6 w-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.344 6.219l-2.344-3.219-2.344 3.219-4.656 7.781h14l-4.656-7.781z" />
          </svg> */}
          {title}
        </h1>
        <p className="text-sm text-slate-300">{subtitle}</p>

        <button
  onClick={onTour}
  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full
    px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3
    text-sm sm:text-base md:text-lg font-semibold
    shadow-[inset_2px_2px_4px_rgba(0,107,82,.6),inset_-2px_-2px_4px_rgba(200,255,235,.5),0_1px_2px_rgba(0,0,0,.1)]
    transition-all will-change-transform"
  style={{
    backgroundImage: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DARK})`,
    color: "#e8fff8",
  }}
  data-tilt-transform-element
>
  Take the tour
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 5l7 7-7 7" />
    <path d="M5 12h14" />
  </svg>
</button>

      </div>
    </div>
  );
}