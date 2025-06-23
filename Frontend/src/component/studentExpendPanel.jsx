// components/StudentExpandedPanel.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Star, X as CloseIcon, PlayCircle } from "lucide-react";

const FALLBACK_IMG = "/images/img5.jpg";

/*──────────────────────── helpers ───────────────────────*/
const Progress = ({ value = 0, max = 100 }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <div className="h-full bg-emerald-500" style={{ width: `${(value / max) * 100}%` }} />
  </div>
);

const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex overflow-x-auto border-b border-gray-200 text-xs font-medium">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`whitespace-nowrap px-3 py-2 transition-colors ${
          active === t ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

const cell = (val) => (val ? val : "N/A");

/*──────────────────────── tables ───────────────────────*/
const OverviewTable = ({ data = {} }) => (
  <div className="grid grid-cols-4 gap-y-2 px-4 py-4 text-sm">
    {/* rows */}
    <span className="text-gray-500">Age</span>
    <span>{cell(data.age)}</span>
    <span className="text-gray-500">Gender</span>
    <span>{cell(data.gender)}</span>

    <span className="col-span-1 mt-2 text-gray-500">Institution</span>
    <span className="col-span-3 mt-2">{cell(data.institution)}</span>

    <span className="mt-2 text-gray-500">Year</span>
    <span className="col-span-3 mt-2">{cell(data.year)}</span>

    <div className="col-span-4 mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
      <PlayCircle className="h-16 w-16 text-gray-400" />
    </div>
  </div>
);

const FinancialNeedsTable = ({ support = [] }) => (
  <div className="px-4 py-4 text-sm">
    {support.length === 0 ? (
      <p className="text-center text-gray-500">N/A</p>
    ) : (
      <table className="w-full">
        <tbody>
          {support.map((item, idx) => (
            <tr key={idx} className="border-b last:border-none">
              <td className="py-2 pl-1 text-gray-600">{item}</td>
              <td className="py-2 pr-1 text-right font-semibold">N/A</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <div className="mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
      <PlayCircle className="h-16 w-16 text-gray-400" />
    </div>
  </div>
);

const AuthenticityChecklist = ({ identity, certificate, resume }) => {
  const items = [
    { label: "ID Verification", file: identity },
    { label: "Certificate", file: certificate },
    { label: "Resume", file: resume },
  ];
  return (
    <ul className="divide-y px-4 py-3 text-sm">
      {items.map(({ label, file }) => (
        <li key={label} className="flex items-center gap-2 py-3">
          {file ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <Star className="h-4 w-4 shrink-0 text-gray-400" />
          )}
          <span className="flex-1 text-gray-700">{label}</span>
          <span className="text-xs text-gray-500">{file ? "Provided" : "N/A"}</span>
        </li>
      ))}
      <div className="mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
        <PlayCircle className="h-16 w-16 text-gray-400" />
      </div>
    </ul>
  );
};

const GoalsUpdates = ({ goal }) => (
  <div className="space-y-6 p-4 text-sm">
    <div className="flex h-48 items-center justify-center rounded-md bg-gray-100">
      <PlayCircle className="h-16 w-16 text-gray-400" />
    </div>
    <article>
      <p className="text-gray-700">{cell(goal)}</p>
    </article>
  </div>
);

/*──────────────────────── donation UI ───────────────────────*/
function Field({ id, type, label, placeholder, value, onChange, error, touched }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
          error && touched ? "border-red-400" : "border-gray-300"
        } focus:ring-gray-800`}
      />
      {error && touched && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

function DonationForm({ onSuccess, onCancel }) {
  const [values, setValues] = useState({ amount: "", name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validate = (v) => {
    const e = {};
    if (!v.amount || +v.amount <= 0) e.amount = "Enter an amount > 0";
    if (!v.name.trim()) e.name = "Name is required";
    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(v.email)) e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(v.phone)) e.phone = "Enter a 10-digit phone";
    return e;
  };

  const handleChange = (e) => {
    setValues((s) => ({ ...s, [e.target.id]: e.target.value }));
    if (!touched) setTouched(true);
    setErrors(validate({ ...values, [e.target.id]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const vErrors = validate(values);
    setErrors(vErrors);
    if (Object.keys(vErrors).length) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/donates", {
        amount: Number(values.amount),
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });
      alert("Thank you for your contribution!");
      onSuccess();
    } catch {
      alert("Unable to send donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const props = (k) => ({ value: values[k], onChange: handleChange, error: errors[k], touched });

  return (
    <form onSubmit={submit} className="grid gap-y-4 gap-x-6 sm:grid-cols-[auto_1fr]">
      <label className="self-center text-sm font-medium text-gray-700">Amount (₹)</label>
      <Field id="amount" type="number" placeholder="1000" {...props("amount")} />

      <label className="self-center text-sm font-medium text-gray-700">Name</label>
      <Field id="name" type="text" placeholder="John Doe" {...props("name")} />

      <label className="self-center text-sm font-medium text-gray-700">Email ID</label>
      <Field id="email" type="email" placeholder="john@example.com" {...props("email")} />

      <label className="self-center text-sm font-medium text-gray-700">Phone</label>
      <Field id="phone" type="tel" placeholder="9876543210" {...props("phone")} />

      <div className="col-span-full mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

/*──────────────────────── main component ─────────────────────*/
export default function StudentExpandedPanel({ student = {}, onClose }) {
  const [active, setActive] = useState("Overview");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donateOpen, setDonateOpen] = useState(false);
  const [donationPreview, setDonationPreview] = useState(0);

  const tabs = ["Overview", "Financial Needs", "Authenticity", "Goals & Updates"];

  /* fetch */
  useEffect(() => {
    if (!student?._id) return;
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/students/${student._id}`);
        setDetails(res.data?.data);
      } catch (err) {
        console.error("Failed to fetch student details:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [student]);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <p className="text-center text-gray-500">Loading details…</p>
      </div>
    );
  }

  const imgSrc = details?.image ? `http://localhost:8000/students/${details.image}` : FALLBACK_IMG;
  const firstName = (details?.name || "Student").split(" ")[0];

  return (
    <>
      {/*──────────────── Donate modal ────────────────*/}
      {donateOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setDonateOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDonateOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <CloseIcon size={22} />
            </button>
            <h3 className="mb-4 text-xl font-semibold">Donate</h3>
            <DonationForm
  onSuccess={() => {
    setDonateOpen(false);
    setDonationPreview(0); // reset preview
  }}
  onCancel={() => {
    setDonateOpen(false);
    setDonationPreview(0);
  }}
  onAmountChange={(val) => setDonationPreview(val)}
/>

          </div>
        </div>
      )}

      {/*──────────────── Student panel ───────────────*/}
      <section className="relative w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white font-inter shadow-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 pb-4 md:px-6">
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
          <CloseIcon size={18} />
        </button>

        {/* header */}
        <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
          <img
            src={imgSrc}
            alt={details?.name || "Student"}
            className="h-40 w-full scale-97 rounded-md object-cover blur-sm border border-black/10 md:h-44 md:w-56"
          />
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold">{details?.name ?? "N/A"}</h3>
            <p className="leading-relaxed text-gray-700">{cell(details?.challange)}</p>
          </div>
        </div>

        {/* progress bar */}
        <div className="space-y-2 px-4 pb-4 md:px-6">
        <Progress value={(details?.raised || 0) + donationPreview} max={details?.goal || 1} />
<div className="text-xs text-gray-500">
  ₹{((details?.raised || 0) + donationPreview).toLocaleString()} raised of ₹{(details?.goal || 0).toLocaleString()}
</div>

          <button
            onClick={() => setDonateOpen(true)}
            className="w-full rounded-md bg-emerald-500 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
          >
            Support {firstName}
          </button>
        </div>

        {/* tabs */}
        <div className="px-4 pb-4 md:px-6">
          <TabBar tabs={tabs} active={active} onChange={setActive} />
          {active === "Overview" && <OverviewTable data={details} />}
          {active === "Financial Needs" && <FinancialNeedsTable support={details?.support || []} />}
          {active === "Authenticity" && (
            <AuthenticityChecklist identity={details?.identity} certificate={details?.certificate} resume={details?.resume} />
          )}
          {active === "Goals & Updates" && <GoalsUpdates goal={details?.goal} />}
        </div>
      </section>
    </>
  );
}
