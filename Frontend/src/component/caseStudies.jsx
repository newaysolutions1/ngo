"use client";
import { useState, Fragment, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { X, PlayCircle } from "lucide-react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

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
export default function CaseStudies() {
  const [open, setOpen] = useState(null);
  const [donateOpen, setDonateOpen] = useState(false);


  const swiperRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleIntroComplete = () => {
    setIntroDone(true);
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {donateOpen && (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    onClick={() => setDonateOpen(false)}  
  >
  
    <div
      onClick={(e) => e.stopPropagation()} 
      className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
    >

      <button
        onClick={() => setDonateOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        <X size={24} />
      </button>

      <h3 className="mb-4 text-xl font-semibold">Donate</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for your contribution!");
          setDonateOpen(false);
        }}
        className="grid gap-y-4 gap-x-6 sm:grid-cols-[auto_1fr]"
      >
        {/* Amount */}
        <label htmlFor="amount" className="self-center text-sm font-medium text-gray-700">
          Amount&nbsp;(₹)
        </label>
        <input
          id="amount"
          type="number"
          required
          placeholder="Amount (₹)"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-800"
        />

    
        <label htmlFor="name" className="self-center text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-800"
        />

  
        <label htmlFor="email" className="self-center text-sm font-medium text-gray-700">
          Email&nbsp;ID
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="Email ID"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-800"
        />


        <label htmlFor="phone" className="self-center text-sm font-medium text-gray-700">
          Phone&nbsp;Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="Phone Number"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-800"
        />

  
        <div className="col-span-full mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setDonateOpen(false)}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#00533F] px-4 py-2 text-sm text-white hover:bg-[#00432c]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* ───── Section Heading ───── */}
      <div className="py-20 px-4 sm:px-6 lg:px-12">
      <h1 className="text-center text-4xl font-bold mb-10">Our Case Studies</h1>
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
              subtitle={`${p.age} yrs `}
              // badge={p.expense}
              onTour={() => setOpen(p)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* Story Modal */}
      {open && (
        <Fragment>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setOpen(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl h-[88vh] flex flex-col overflow-hidden">
              <section className="flex flex-col lg:flex-row gap-8 p-8">
                <div className="lg:w-[40%] w-full border border-black/10 rounded-md">
                  <img src={open.image} alt={open.name} className="w-full h-60 lg:h-72 object-cover blur-sm rounded-xl" />
                </div>
                <div className="lg:w-[60%] w-full space-y-10">
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
              <section className="flex-1 overflow-y-auto px-6 pb-8">
                <p className="text-center text-xl font-semibold mb-3">Story</p>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{open.story}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mt-10">
                  <span className="text-lg">Email us to donate</span>
                  <button
                    type="button"
                    onClick={() => setDonateOpen(true)}
                    className="px-8 py-2 bg-[#00533F] text-white rounded-xl hover:bg-opacity-80"
                  >
                    Donate
                  </button>
                </div>
                <div className="mt-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
                  <PlayCircle className="h-16 w-16 text-gray-400" />
                </div>
              </section>
              <button
                onClick={() => setOpen(null)}
                className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
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
