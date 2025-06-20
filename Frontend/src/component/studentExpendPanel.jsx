import React, { useState } from "react";
import {
  CheckCircle,
  Star,
  X as CloseIcon,
  PlayCircle,
} from "lucide-react";
const Progress = ({ value, max = 100 }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <div
      className="h-full bg-emerald-500"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex overflow-x-auto border-b border-gray-200 text-xs font-medium">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`whitespace-nowrap px-3 py-2 transition-colors ${
          active === t
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);
const OverviewTable = () => (
  <div className="grid grid-cols-4 gap-y-2 px-4 py-4 text-sm">
    <span className="col-span-1 text-gray-500">Age</span>
    <span>24</span>
    <span className="text-gray-500">Gender</span>
    <span>Female</span>

    <span className="col-span-1 mt-2 text-gray-500">University</span>
    <span className="col-span-3 mt-2">
      Federal University of Rio de Janeiro
    </span>

    <span className="mt-2 text-gray-500">Year</span>
    <span className="mt-2">4th Year</span>
    <div className="col-span-4 mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
      <PlayCircle className="h-16 w-16 text-gray-400" />
    </div>
  </div>
);

const FinancialNeedsTable = () => {
  const rows = [
    ["Tuition", "$8,000"],
    ["Medical Equipment", "$2,000"],
    ["Living Expenses", "$1,500"],
    ["Books & Materials", "$500"],
  ];
  return (
    <div className="px-4 py-4">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([need, cost]) => (
            <tr key={need} className="border-b last:border-none">
              <td className="py-2 pl-1 text-gray-600">{need}</td>
              <td className="py-2 pr-1 text-right font-semibold">{cost}</td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={2}
              className="pt-2 pb-3 pl-1 text-xs text-gray-400"
            >
              Deadline: 11/30/2023
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
        <PlayCircle className="h-16 w-16 text-gray-400" />
      </div>
    </div>
  );
};

const AuthenticityChecklist = () => {
  const items = [
    "ID Verification",
    "University Enrollment",
    "Academic Merit Certificate",
    "Community Service Record",
  ];
  return (
    <ul className="divide-y px-4 py-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 py-3">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="flex-1 text-gray-700">{item}</span>
          <Star className="h-4 w-4 shrink-0 text-gray-400" />
        </li>
      ))}
      <div className="mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
        <PlayCircle className="h-16 w-16 text-gray-400" />
      </div>
    </ul>
  );
};

const GoalsUpdates = () => (
  <div className="space-y-6 p-4 text-sm">
    <div className="flex h-48 items-center justify-center rounded-md bg-gray-100">
      <PlayCircle className="h-16 w-16 text-gray-400" />
    </div>
    <article>
      <time className="mb-1 block text-xs text-gray-500">2023‑09‑05</time>
      <p className="text-gray-700">
        Completed my clinical rotation in pediatrics with honors. I’m now
        preparing for my next rotation in rural medicine.
      </p>
    </article>
    <article>
      <time className="mb-1 block text-xs text-gray-500">2022‑01‑20</time>
      <p className="text-gray-700">
        Participated in a medical mission to provide healthcare services to an
        underserved community in the Amazon region.
      </p>
    </article>
  </div>
);
export default function StudentExpandedPanel({
  student = {},
  onClose = () => {},
}) {
  const [active, setActive] = useState("Overview");
  const tabs = [
    "Overview",
    "Financial Needs",
    "Authenticity",
    "Goals & Updates",
  ];

  return (
    <section className="relative w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white font-inter shadow-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 pb-4 md:px-6">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <CloseIcon size={18} />
      </button>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
        <div className="border border-black/10 border-2xl rounded-md">
        <img
          src={
            student.img ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80"
          }
          alt={student.name || "Student"}
          className="h-40 w-full rounded-md object-cover md:h-44 md:w-56 blur-sm scale-97"
        />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold">
            {student.name || "Maria Rodriguez"}
          </h3>
          <p className="leading-relaxed text-gray-700">
            I am the first in my family pursuing higher education. My dream is
            to become a doctor and return to my rural community where medical
            care is scarce. I have been volunteering at local clinics since high
            school and have seen firsthand how proper medical care can transform
            lives.
          </p>
        </div>
      </div>
      <div className="space-y-2 px-4 pb-4 md:px-6">
        <Progress value={7100} max={12000} />
        <div className="text-xs text-gray-500">
          $7,100 raised of $12,000
        </div>
        <button className="w-full rounded-md bg-emerald-500 py-2 text-xs font-semibold text-white hover:bg-emerald-600">
          Support {(student.name || "Student").split(" ")[0]}
        </button>
      </div>
      <TabBar tabs={tabs} active={active} onChange={setActive} />
      {active === "Overview" && <OverviewTable />}
      {active === "Financial Needs" && <FinancialNeedsTable />}
      {active === "Authenticity" && <AuthenticityChecklist />}
      {active === "Goals & Updates" && <GoalsUpdates />}
    </section>
  );
}
