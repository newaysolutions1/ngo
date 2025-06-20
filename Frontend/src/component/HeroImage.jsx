
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit:   { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
};

export default function HeroWithImage() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  return (
    <section className="flex flex-col items-center text-center px-4 py-16 relative">
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
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close Modal"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-semibold mb-4">Donate</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your contribution!");
                  setOpen(false);
                }}
                className="space-y-4 text-left"
              >
                {[
                  { id: "amount", type: "number", label: "Amount (₹)" },
                  { id: "name", type: "text", label: "Name" },
                  { id: "email", type: "email", label: "Email ID" },
                  { id: "phone", type: "tel", label: "Phone Number" },
                ].map(({ id, type, label }, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <label htmlFor={id} className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={label}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={toggleModal}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="max-w-3xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Great futures are built
          <br className="hidden sm:block" />
          with a small charity
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          The world’s largest social fundraising platform,
          <br className="hidden sm:block" />
          optimized for your charity in a more easy way
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={toggleModal}
            className="rounded-full bg-gray-900 text-white px-6 py-3 text-sm sm:text-base font-medium shadow-md transition hover:bg-gray-800"
          >
            Donate now
          </button>
        </div>
      </motion.div>
      <div className="w-full max-w-screen-2xl mx-auto mt-16">
        <motion.div
          className="
            flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-4
            px-2 sm:px-4 lg:px-0
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="flex flex-col gap-4 w-full lg:w-auto"
          >
           <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex flex-col justify-between w-full h-72 sm:h-80 md:h-96 rounded-[30px] p-6 bg-[#00533F] text-white shadow-xl">
              <div>
                <p className="text-3xl font-semibold text-start">65%</p>
                <p className="mt-4 text-base leading-snug text-start">
                  17 Thousand People Died,
                  <br />
                  Thousand Injured, Houses and Buildings Destroyed.
                  Turkey‑Syria Grieves
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="inline-flex items-center self-start rounded-full bg-[#00D1B2] px-6 sm:px-10 py-3 text-sm font-medium text-[#00533F] transition hover:bg-[#00b499] mt-2"
              >
                Donate&nbsp;now <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="flex items-center justify-center w-full h-14 rounded-[30px] bg-[#0A0F2C] text-white shadow-xl">
              <span className="text-sm font-medium">Let&nbsp;them be heard</span>
            </div>
          </div>
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] w-full h-72 sm:h-80 md:h-96"
          >
              <div className="relative overflow-hidden rounded-[30px] w-full h-72 sm:h-80 md:h-96">
            <img
              src="/images/img5.jpg"
              alt="Health Campaign"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex h-full flex-col justify-between p-6 text-white">
              <h3 className="text-lg font-semibold text-start">Health</h3>
              <p className="text-base leading-snug text-start">
                Life skills for 2 587 children in South Africa
              </p>
            </div>
          </div>
          </motion.div>
          <motion.div
            custom={2}
            variants={fadeUp}
            className=""
          >
                 <div className="flex flex-col items-center justify-center shrink-0 w-full sm:w-[240px] md:w-[260px] lg:w-auto h-48 rounded-[30px] p-6 text-center bg-[#E1E5EE] shadow-xl  sm:mt-48">
            <p className="text-lg font-semibold text-[#0A0F2C]">
              Join 5 000+
              <br />
              People Donate
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0A0F2C] shadow transition hover:bg-[#f7f8fa]">
              Join&nbsp;community <ArrowUpRight size={16} />
            </button>
          </div>
          </motion.div>
          <motion.div
            custom={3}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] w-full h-72 sm:h-80 md:h-96"
          >
               <div className="relative overflow-hidden rounded-[30px] w-full h-72 sm:h-80 md:h-96">
            <img
              src="/images/img6.jpg"
              alt="Education Campaign"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex h-full flex-col justify-between p-6 text-white">
              <h3 className="text-lg font-semibold text-start">Education</h3>
              <p className="text-base leading-snug text-start">
                Sponsor food &amp; education for orphans in India
              </p>
            </div>
          </div>
          </motion.div>
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-col gap-4 w-full lg:w-auto"
          >
                <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="relative overflow-hidden rounded-[30px] w-full h-72 sm:h-80 md:h-96 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=60"
                alt="Explore Now"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#00533F]/90" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <div />
                <Link to="/education">
                  <button className="inline-flex items-center self-start rounded-full bg-[#00D1B2] px-6 sm:px-10 py-3 text-sm font-medium text-[#00533F] transition hover:bg-[#00b499]">
                    Explore&nbsp;now <ArrowUpRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-14 rounded-[30px] bg-[#0A0F2C] text-white shadow-xl">
              <span className="text-sm font-medium">Your home for help</span>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
