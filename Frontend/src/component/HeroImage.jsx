"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import axios from "axios";

/* ───── animation helpers ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};
const modalBackdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const modalContent = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
};

/* ───── tilt wrapper ───── */
function TiltBox({ className = "", children, bg = "transparent" }) {
  const boxRef = useRef(null);
  useEffect(() => {
    if (!boxRef.current) return;
    VanillaTilt.init(boxRef.current, {
      max: 10,
      speed: 500,
      perspective: 1800,
      glare: true,
      "max-glare": 0.1,
      scale: 1.03,
    });
    return () => boxRef.current?.vanillaTilt?.destroy();
  }, []);

  return (
    <div
      ref={boxRef}
      data-tilt
      className={`relative will-change-transform rounded-[30px] overflow-hidden cursor-grab shadow-[0_0_0_2px_rgba(0,210,132,0.45),0_0_25px_8px_rgba(0,210,132,0.2)] ${className}`}
      style={{ background: bg }}
    >
      <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-[rgba(0,210,132,0.25)]"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
    </div>
  );
}

/* ───── Field component lives OUTSIDE DonationForm ───── */
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

/* ───── donation form ───── */
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <Field id="amount" type="number" label="Amount (₹)" placeholder="1000"
        value={values.amount} onChange={handleChange}
        error={errors.amount} touched={touched} />
      <Field id="name" type="text" label="Name" placeholder="John Doe"
        value={values.name} onChange={handleChange}
        error={errors.name} touched={touched} />
      <Field id="email" type="email" label="Email ID" placeholder="john@example.com"
        value={values.email} onChange={handleChange}
        error={errors.email} touched={touched} />
      <Field id="phone" type="tel" label="Phone Number" placeholder="9876543210"
        value={values.phone} onChange={handleChange}
        error={errors.phone} touched={touched} />

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="rounded-md bg-[#00533F] px-4 py-2 text-sm text-white hover:bg-[#00432c] disabled:opacity-60">
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

/* ───── main hero ───── */
export default function HeroWithImage() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((o) => !o);

  return (
    <section className="flex flex-col items-center text-center px-4 py-16 relative">
      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={toggleModal}
          >
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none">
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4">Donate</h3>
              <DonationForm onSuccess={toggleModal} onCancel={toggleModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────── Heading ─────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Great futures are built
          <br className="hidden sm:block" />
          with a small charity
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          The world’s largest social fundraising platform,
          <br className="hidden sm:block" /> optimized for your charity in a more easy way
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button onClick={toggleModal} className="rounded-full bg-[#00D284] text-white px-6 py-3 text-sm sm:text-base font-medium shadow-md transition hover:bg-[#009b66]">
            Donate now
          </button>
        </div>
      </motion.div>

      {/* ─────── Tilt Grid ─────── */}
      <div className="w-full max-w-screen-2xl mx-auto mt-16">
        <motion.div
          className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-4 px-2 sm:px-4 lg:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 – Donate */}
          <motion.div custom={0} variants={fadeUp} className="flex flex-col gap-4">
            <TiltBox className="flex flex-col justify-between h-72 sm:h-80 md:h-96 p-6 bg-[#00533F] text-black">
              <div>
                <p className="text-3xl font-semibold text-start sm:mt-18">65%</p>
                <p className="mt-4 text-base leading-snug text-start">
                  17 Thousand People Died,
                  <br /> Thousand Injured, Houses and Buildings Destroyed.
                  Turkey‑Syria Grieves
                </p>
              </div>
              <button onClick={toggleModal} className="inline-flex items-center self-start rounded-full bg-[#00D284] px-6 sm:px-10 py-3 text-sm font-medium text-white transition hover:bg-[#009b66] mt-2">
                Donate&nbsp;now <ArrowUpRight size={16} />
              </button>
            </TiltBox>
            <TiltBox className="flex items-center justify-center h-14 bg-[#0A0F2C] text-black">
              <span className="text-lg mt-4 font-medium">Let&nbsp;them be heard</span>
            </TiltBox>
          </motion.div>

          {/* Card 2 – Health */}
          <motion.div custom={1} variants={fadeUp}>
            <TiltBox className="relative h-72 sm:h-80 md:h-96 sm:mt-18">
              <img src="/images/img5.jpg" alt="Health Campaign" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <h3 className="text-lg font-semibold text-start">Health</h3>
                <p className="text-base leading-snug text-start">Life skills for 2 587 children in South Africa</p>
              </div>
            </TiltBox>
          </motion.div>

          {/* Card 3 – Join community */}
          <motion.div custom={2} variants={fadeUp}>
            <TiltBox className="flex flex-col items-center justify-center h-48 bg-[#E1E5EE] text-center p-6 sm:mt-66">
              <p className="text-lg font-semibold text-[#0A0F2C] sm:mt-10">
                Join 5 000+
                <br /> People Donate
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00D284] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#009b66] sm:mt-12">
                Join&nbsp;community <ArrowUpRight size={16} />
              </button>
            </TiltBox>
          </motion.div>

          {/* Card 4 – Education */}
          <motion.div custom={3} variants={fadeUp}>
            <TiltBox className="relative h-72 sm:h-80 md:h-96 sm:mt-18">
              <img src="/images/img6.jpg" alt="Education Campaign" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <h3 className="text-lg font-semibold text-start">Education</h3>
                <p className="text-base leading-snug text-start">Sponsor food & education for orphans in India</p>
              </div>
            </TiltBox>
          </motion.div>

          {/* Card 5 – Explore now */}
          <motion.div custom={4} variants={fadeUp} className="flex flex-col gap-4">
            <TiltBox className="relative h-72 sm:h-80 md:h-96 ">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=60"
                alt="Explore Now"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#00533F]/90" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <div />
                <Link to="/education">
                  <button className="inline-flex items-center self-start rounded-full bg-[#00D284] px-6 sm:px-10 py-3 text-sm font-medium text-white transition hover:bg-[#009b66]">
                    Explore&nbsp;now <ArrowUpRight size={16} />
                  </button>
                </Link>
              </div>
            </TiltBox>
            <TiltBox className="flex items-center justify-center h-14 bg-[#0A0F2C] text-black">
              <span className="text-lg mt-4 font-medium">Your home for help</span>
            </TiltBox>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
