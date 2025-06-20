import { useEffect, useState } from "react";

export default function SiteLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 3);
        if (next === 100) clearInterval(id);
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <div className="loader-body">
      <pixel-canvas
        data-gap="6"
        data-speed="35"
        data-colors="#e0f2fe,#7dd3fc,#0ea5e9"
      />
      <div className="loader-container">
        <div className="logo-loader">
          <svg className="logo-outline" viewBox="0 0 200 200">
            <path
              d="M50 40h100v30H80v15h60v30H80v15h70v30H50z"
              fill="none"
              stroke="#0077ff"
              strokeWidth="4"
            />
          </svg>
          <div className="logo-fill" style={{ height: `${progress}%` }} />
        </div>
        <div className="loading-percentage">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
}
