"use client";
import { useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { X } from "lucide-react";
import {
  Pagination,
  A11y,
  Autoplay,
  FreeMode,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      {donateOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setDonateOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDonateOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Donate</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for your contribution!");
                setDonateOpen(false);
              }}
              className="space-y-4"
            >
              <input
                type="number"
                placeholder="Amount (₹)"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
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
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mb-8 mt-24">
        Our Case Studies
      </h1>
      <Swiper
       modules={[Autoplay, FreeMode]}
       loop
       centeredSlides
       freeMode
       grabCursor
       speed={1500}
       autoplay={{ delay: 10, disableOnInteraction: false }}
        breakpoints={{
          320:  { slidesPerView: 1.2,   spaceBetween: 20 },
          640:  { slidesPerView: 1.5, spaceBetween: 30 },
          768:  { slidesPerView: 2,   spaceBetween: 40 },
          1024: { slidesPerView: 2.5, spaceBetween: 60 },
          1280: { slidesPerView: 3,   spaceBetween: 80 },
          1536: { slidesPerView: 3.5, spaceBetween: 100 },
        }}
        className="px-4 sm:px-6 md:px-8"
      >
        {PATIENTS.map((p) => (
          <SwiperSlide key={p.id}
          className="transition-transform duration-700 ease-out"
         >
            <div className="bg-gray-300 h-[26rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[34rem] rounded-3xl shadow-lg overflow-hidden">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover blur-sm scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center gap-4 px-4 mb-8">
                  <h3 className="text-white text-xl sm:text-2xl font-semibold drop-shadow-sm">
                    {p.name}
                  </h3>
                  <button
                    onClick={() => setOpen(p)}
                    className="px-6 py-2 bg-white text-gray-900 text-base sm:text-lg font-medium rounded-xl backdrop-blur-sm transition hover:scale-105"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
        ))}
        <style jsx>{`
        .swiper-slide {
          will-change: transform;
        }

        /* Active: slightly larger & full opacity */
        .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }

        /* Neighbours: subtle shrink & fade */
        .swiper-slide-next,
        .swiper-slide-prev {
          transform: scale(0.92);
          opacity: 0.85;
        }
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) {
          transform: scale(0.85);
          opacity: 0.6;
        }
      `}</style>
      </Swiper>
      {open && (
        <Fragment>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setOpen(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl
                         h-[88vh] sm:h-[80vh] flex flex-col overflow-hidden"
            >
              <section className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8 flex-none">
                <div className="border border-black/10 border-2xl rounded-md ">
                  <img
                    src={open.image}
                    alt={open.name}
                    className="w-full lg:w-full h-52 sm:h-60 lg:h-72 object-cover blur-sm scale-97 rounded-xl"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {open.name}
                  </h2>
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
              <section className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8">
                <p className="text-center text-xl sm:text-2xl font-semibold mb-3">
                  Story
                </p>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {open.story}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mt-10">
                  <span className="text-lg sm:text-xl">Email us to donate</span>
                  <button
                    type="button"
                    onClick={() => setDonateOpen(true)}
                    className="px-8 py-2 bg-black text-white rounded-xl hover:bg-opacity-80 transition"
                  >
                    Donate
                  </button>
                </div>
              </section>
              <button
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute top-0 right-0
                           flex h-10 w-10 items-center justify-center
                           text-2xl text-gray-500 hover:text-black
                           rounded-full hover:bg-gray-100 transition"
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
