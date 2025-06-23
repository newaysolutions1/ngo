// components/Footer.jsx
"use client";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { X } from "lucide-react";
import axios from "axios";

/*──────────────────────── reusable Field ───────────────────────*/
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

/*──────────────────────── DonationForm ─────────────────────────*/
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

  const handleSubmit = async (e) => {
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
      setValues({ amount: "", name: "", email: "", phone: "" });
      onSuccess();
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const props = (key) => ({
    value: values[key],
    onChange: handleChange,
    error: errors[key],
    touched,
  });

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-4 gap-x-6 sm:grid-cols-[auto_1fr]">
      <label className="self-center text-sm font-medium text-gray-700">Amount&nbsp;(₹)</label>
      <Field id="amount" type="number" placeholder="1000" {...props("amount")} />

      <label className="self-center text-sm font-medium text-gray-700">Name</label>
      <Field id="name" type="text" placeholder="John Doe" {...props("name")} />

      <label className="self-center text-sm font-medium text-gray-700">Email ID</label>
      <Field id="email" type="email" placeholder="john@example.com" {...props("email")} />

      <label className="self-center text-sm font-medium text-gray-700">Phone Number</label>
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
          className="rounded-md bg-[#00533F] px-4 py-2 text-sm text-white hover:bg-[#00432c] disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

/*──────────────────────── Footer component ─────────────────────*/
export default function Footer() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((o) => !o);

  return (
    <footer>
      {/*────────── Donate modal ──────────*/}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={toggleModal}
        >
          <div
            className="relative w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>
            <h3 className="mb-4 text-xl font-semibold">Donate</h3>
            <DonationForm onSuccess={toggleModal} onCancel={toggleModal} />
          </div>
        </div>
      )}

      {/*────────── Footer body ──────────*/}
      <div className="mx-3 mb-3 rounded-3xl bg-[#064C3A] px-4 py-4 md:px-8 md:py-12 text-white space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={toggleModal}
            className="inline-flex items-center gap-3 rounded-full bg-[#0B6149] px-6 py-3 font-medium shadow-md transition hover:bg-[#0d6d52]"
          >
            Donate now
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E0D20D] text-black">
              <FiArrowUpRight />
            </span>
          </button>
        </div>

        <hr className="border-gray/100" />

        <div className="flex flex-col text-sm lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-6 text-md">
            <p>© 2023 Gocinga NGO.</p>
            <a href="/" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" className="hover:underline">
              Terms of Use
            </a>
          </div>
          <nav className="mt-10 flex flex-wrap sm:mt-0">
            <div className="flex gap-6 text-xl">
              <FaFacebook className="cursor-pointer hover:opacity-80" />
              <FaLinkedin className="cursor-pointer hover:opacity-80" />
              <FaXTwitter className="cursor-pointer hover:opacity-80" />
            </div>
          </nav>
        </div>

        <p className="text-md leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </footer>
  );
}
