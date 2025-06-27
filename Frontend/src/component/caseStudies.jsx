"use client";
import { useState, Fragment, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { X, PlayCircle } from "lucide-react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import TiltCard from "./TiltCard";
import axios from "axios";

const videoUrl = ""; // or null if not present


/*──────────────────────── PATIENTS DATA ────────────────────────*/
const PATIENTS = [
  {
    id: 1,
    name: "Kanahiya",
    age: 35,
    duration: "1 year",
    expense: "₹50,000 / month",
    story:
      "Kanahiya, a 35-year-old father and fighter, has been battling kidney failure for over a year now. For the past 14 months, he has been undergoing dialysis three times a week, each session costing around ₹50,000 monthly.Before discovering Ekzaria, Kanahiya and his family had already spent ₹4–5 lakhs trying to manage his condition, pushing them into financial hardship.He came to know about Ekzaria through hospitals he visited in search of affordable treatment. Since then, Ekzaria has stepped in to support him on this difficult journey, making life a bit more manageable and restoring hope for him and his loved ones.",
    image: "/images/img5.jpg",
  },
  {
    id: 2,
    name: "Ajay Kumar",
    age: 34,
    duration: "1 month",
    expense: "₹25 000 / month",
    story:
      "Ajay Kumar’s battle with kidney failure began over 6 years ago. It started when he developed high blood pressure. Though medication helped stabilize his BP, his kidney health unfortunately kept deteriorating.Before Ekzaria, he struggled for over a year with the emotional and financial toll of dialysis—three sessions every week—while trying to continue earning a living.Ajay’s life took a turn when a friend, a local bike shop owner, introduced him to Ekzaria. Since then, not only has Ajay received support as a patient, but he also found purpose. He has now been working with Ekzaria for the past 6 years, becoming a pillar of strength and hope for others walking the same path he once did.",
    image: "/images/img6.jpg",
  },
  {
    id: 3,
    name: "Kanahiya",
    age: 35,
    duration: "1 year",
    expense: "₹50,000 / month",
    story:
      "Kanahiya, a 35-year-old father and fighter, has been battling kidney failure for over a year now. For the past 14 months, he has been undergoing dialysis three times a week, each session costing around ₹50,000 monthly.Before discovering Ekzaria, Kanahiya and his family had already spent ₹4–5 lakhs trying to manage his condition, pushing them into financial hardship.He came to know about Ekzaria through hospitals he visited in search of affordable treatment. Since then, Ekzaria has stepped in to support him on this difficult journey, making life a bit more manageable and restoring hope for him and his loved ones.",
    image: "/images/img5.jpg",
  },
  {
    id: 4,
    name: "Ajay Kumar",
    age: 34,
    duration: "1 month",
    expense: "₹25 000 / month",
    story:
      "Ajay Kumar’s battle with kidney failure began over 6 years ago. It started when he developed high blood pressure. Though medication helped stabilize his BP, his kidney health unfortunately kept deteriorating.Before Ekzaria, he struggled for over a year with the emotional and financial toll of dialysis—three sessions every week—while trying to continue earning a living.Ajay’s life took a turn when a friend, a local bike shop owner, introduced him to Ekzaria. Since then, not only has Ajay received support as a patient, but he also found purpose. He has now been working with Ekzaria for the past 6 years, becoming a pillar of strength and hope for others walking the same path he once did.",
    image: "/images/img6.jpg",
  },
  {
    id: 5,
    name: "Kanahiya",
    age: 35,
    duration: "1 year",
    expense: "₹50,000 / month",
    story:
      "Kanahiya, a 35-year-old father and fighter, has been battling kidney failure for over a year now. For the past 14 months, he has been undergoing dialysis three times a week, each session costing around ₹50,000 monthly.Before discovering Ekzaria, Kanahiya and his family had already spent ₹4–5 lakhs trying to manage his condition, pushing them into financial hardship.He came to know about Ekzaria through hospitals he visited in search of affordable treatment. Since then, Ekzaria has stepped in to support him on this difficult journey, making life a bit more manageable and restoring hope for him and his loved ones.",
    image: "/images/img5.jpg",
  },
  {
    id: 6,
    name: "Ajay Kumar",
    age: 34,
    duration: "1 month",
    expense: "₹25 000 / month",
    story:
      "Ajay Kumar’s battle with kidney failure began over 6 years ago. It started when he developed high blood pressure. Though medication helped stabilize his BP, his kidney health unfortunately kept deteriorating.Before Ekzaria, he struggled for over a year with the emotional and financial toll of dialysis—three sessions every week—while trying to continue earning a living.Ajay’s life took a turn when a friend, a local bike shop owner, introduced him to Ekzaria. Since then, not only has Ajay received support as a patient, but he also found purpose. He has now been working with Ekzaria for the past 6 years, becoming a pillar of strength and hope for others walking the same path he once did.",
    image: "/images/img6.jpg",
  },
];

/*──────────────────────── REUSABLE FIELD ───────────────────────*/
function Field({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  touched,
}) {
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
      {error && touched && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}

/*──────────────────────── DONATION FORM ───────────────────────*/
function DonationForm({ onSuccess, onCancel }) {
  const [values, setValues] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validate = (v) => {
    const e = {};
    if (!v.amount || +v.amount <= 0) e.amount = "Enter an amount > 0";
    if (!v.name.trim()) e.name = "Name is required";
    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(v.email))
      e.email = "Enter a valid email";
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
    <form
      onSubmit={handleSubmit}
      className="grid gap-y-4 gap-x-6 sm:grid-cols-[auto_1fr]"
    >
      <label className="self-center text-sm font-medium text-gray-700">
        Amount&nbsp;(₹)
      </label>
      <Field
        id="amount"
        type="number"
        placeholder="1000"
        {...commonProps("amount")}
      />

      <label className="self-center text-sm font-medium text-gray-700">
        Name
      </label>
      <Field
        id="name"
        type="text"
        placeholder="John Doe"
        {...commonProps("name")}
      />

      <label className="self-center text-sm font-medium text-gray-700">
        Email&nbsp;ID
      </label>
      <Field
        id="email"
        type="email"
        placeholder="john@example.com"
        {...commonProps("email")}
      />

      <label className="self-center text-sm font-medium text-gray-700">
        Phone&nbsp;Number
      </label>
      <Field
        id="phone"
        type="tel"
        placeholder="9876543210"
        {...commonProps("phone")}
      />

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

  function commonProps(key) {
    return {
      value: values[key],
      onChange: handleChange,
      error: errors[key],
      touched,
    };
  }
}

/*──────────────────────── MAIN COMPONENT ──────────────────────*/
export default function CaseStudies() {
  const [open, setOpen] = useState(null);
  const [donateOpen, setDonateOpen] = useState(false);
  const swiperRef = useRef(null);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {/*────────── Donate Modal ──────────*/}
      {donateOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/20 backdrop-blur-lg bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setDonateOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={() => setDonateOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>
            <h3 className="mb-4 text-xl font-semibold">Donate</h3>
            <DonationForm
              onSuccess={() => setDonateOpen(false)}
              onCancel={() => setDonateOpen(false)}
            />
          </div>
        </div>
      )}

      {/*────────── Carousel Heading ──────────*/}
      <div className="py-20 px-4 sm:px-6 lg:px-12">
        <h1 className="mb-10 text-center text-4xl font-bold">
          Our Case Studies
        </h1>
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop
          grabCursor
          freeMode
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          speed={1500}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2.5, spaceBetween: 60 },
            1280: { slidesPerView: 3, spaceBetween: 80 },
          }}
        >
          {PATIENTS.map((p) => (
            <SwiperSlide key={p.id}>
              <TiltCard
                bg={p.image}
                title={p.name}
                subtitle={`${p.age} yrs`}
                onTour={() => setOpen(p)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/*────────── Story Modal ──────────*/}
      {open && (
        <Fragment>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* header */}
              <section className="flex flex-col gap-8 p-8 lg:flex-row">
                <div className="w-full rounded-md border border-black/10 lg:w-[50%]">
                  <img
                    src={open.image}
                    alt={open.name}
                    className="h-50 w-full rounded-xl object-cover blur-sm lg:h-72"
                  />
                </div>
                <div className="w-full space-y-10 lg:w-[60%] ">
                  <h2 className="text-2xl font-bold">{open.name}</h2>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-gray-700">
                    <dt className="font-semibold">Age:</dt>
                    <dd>{open.age}</dd>
                    <dt className="font-semibold">Duration:</dt>
                    <dd>{open.duration}</dd>
                    <dt className="font-semibold">Approx. monthly expense:</dt>
                    <dd>{open.expense}</dd>
                  </dl>
                </div>
              </section>
              {/* story */}
              <section className="flex-1 overflow-y-auto px-8 pb-8">
                <p className="mb-3 text-center text-xl font-semibold">Story</p>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {open.story}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                  <span className="text-lg">Email us to donate</span>
                  <button
                    type="button"
                    onClick={() => setDonateOpen(true)}
                    className="rounded-xl bg-[#00533F] px-8 py-2 text-white hover:bg-opacity-80"
                  >
                    Donate
                  </button>
                </div>

                <div className="mt-4 flex h-78 items-center justify-center rounded-md bg-gray-100 overflow-hidden">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      controls
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <PlayCircle className="h-16 w-16 text-gray-400" />
                  )}
                </div>
              </section>
              <button
                onClick={() => setOpen(null)}
                className="absolute top-0 right-3 rounded-2xl text-2xl text-gray-500 hover:bg-gray-100 hover:text-black"
              >
                ×
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
