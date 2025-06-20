import React, { useState, useEffect } from "react";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./component/footer";
import FaqSection from "./component/faqSection";
import StudentExpandedPanel from "./component/studentExpendPanel";
import SiteLoader from "./component/SiteLoader";
import { ArrowRight } from "lucide-react";
import { Menu, X } from "lucide-react";
import HopeInAction from "./component/hopeInSection";

export default function EducationPage() {
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/img5.jpg";
    img.onload = () => setLoading(false);
  }, []);
  const students = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Student ${i + 1}`,
    img: "/images/img5.jpg",
  }));
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const wordVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07, 
        delayChildren: 0.2,
      },
    },
  };
  if (loading) return <SiteLoader />;

  const navLinks = [
    { id: 1, label: "Home", href: "/education" },
    { id: 2, label: "Medical", href: "/medical" },
    { id: 3, label: "Apply as a Student", modal: true },
  ];

  const toggleModal = () => setOpen(!open);
  return (
    <div className="">
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={toggleModal}
        >
          <div
            className=" relative bg-white rounded-2xl shadow-2xl
    w-[90%] max-w-md 
    max-h-[80vh]   
    overflow-y-auto 
    p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Apply as a student</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for your contribution!");
                setOpen(false);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="cityState"
                >
                  City & State
                </label>
                <input
                  id="cityState"
                  type="text"
                  placeholder="City & State"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Age"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="gender"
                  >
                    Gender (Optional)
                  </label>
                  <input
                    id="gender"
                    type="text"
                    placeholder="Gender"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="institution"
                >
                  Current Institution/College/School
                </label>
                <input
                  id="institution"
                  type="text"
                  placeholder="Institution Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="course"
                >
                  Current Course/Program
                </label>
                <input
                  id="course"
                  type="text"
                  placeholder="Course/Program"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="year"
                >
                  Year of Study
                </label>
                <input
                  id="year"
                  type="text"
                  placeholder="e.g., 1st year, 2nd year"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="performance"
                >
                  Academic Performance (Optional)
                </label>
                <input
                  id="performance"
                  type="text"
                  placeholder="Grade/Percentage"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-gray-700">
                  Type of Support Required
                </legend>
                {[
                  "Financial Aid",
                  "Career Guidance",
                  "Internship / Job Opportunities",
                  "Skill Development / Courses",
                  "Mentorship",
                  "Mental Health Support",
                  "Networking Opportunities",
                ].map((label, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`support-${idx}`}
                      className="mr-2"
                    />
                    <label htmlFor={`support-${idx}`} className="text-gray-700">
                      {label}
                    </label>
                  </div>
                ))}
                <div>
                  <input type="checkbox" id="support-other" className="mr-2" />
                  <label htmlFor="support-other" className="text-gray-700">
                    Other
                  </label>
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="ml-2 w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  />
                </div>
              </fieldset>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="challenges"
                >
                  What challenges are you currently facing in your academic or
                  personal journey?
                </label>
                <textarea
                  id="challenges"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="aspirations"
                >
                  What are your career goals or fields you're passionate about?
                </label>
                <input
                  id="aspirations"
                  type="text"
                  placeholder="Your answer"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-gray-700">
                  Preferred Mode of Communication
                </legend>
                {["Email", "Phone Call", "WhatsApp", "Telegram"].map(
                  (mode, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        name="communication"
                        id={`comm-${idx}`}
                        className="mr-2"
                      />
                      <label htmlFor={`comm-${idx}`} className="text-gray-700">
                        {mode}
                      </label>
                    </div>
                  )
                )}
              </fieldset>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="resume"
                >
                  Upload Resume / CV
                </label>
                <input id="resume" type="file" className="w-full" />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="studentProof"
                >
                  College ID / Student Proof
                </label>
                <input id="studentProof" type="file" className="w-full" />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="certificates"
                >
                  Certificates / Achievements
                </label>
                <input id="certificates" type="file" className="w-full" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="consent" required className="mr-2" />
                <label htmlFor="consent" className="text-gray-700">
                  I agree to be contacted by the Ekzaria team and understand my
                  data will be used only for support purposes.
                </label>
              </div>
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
          </div>
        </div>
      )}
      <header className="relative w-full overflow-hidden bg-gray-300 shadow-sm">
        <nav className="mx-auto mt-4 flex w-[90%] max-w-6xl items-center justify-between rounded-3xl bg-white/70 px-4 py-3 backdrop-blur-md md:mt-8 md:px-8 md:py-5">
          <a href="/" className="text-xl font-bold text-gray-900">
            Ekzaria
          </a>
          <ul className="hidden gap-12 text-lg md:flex">
            {navLinks.map((link) =>
              link.modal ? (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setMenuOpen(false); 
                      toggleModal();
                    }}
                    className="relative cursor-pointer text-gray-800
                     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
                     after:origin-left after:scale-x-0 after:bg-current
                     after:transition-transform after:duration-300
                     hover:text-[#00533F] hover:after:scale-x-100"
                  >
                    {link.label}
                  </button>
                </li>
              ) : (
                <li
                  key={link.id}
                  className="relative cursor-pointer text-gray-800
                   after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
                   after:origin-left after:scale-x-0 after:bg-current
                   after:transition-transform after:duration-300
                   hover:text-[#00533F] hover:after:scale-x-100"
                >
                  <a href={link.href}>{link.label}</a>
                </li>
              )
            )}
          </ul>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="md:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
        <motion.ul
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            closed: { opacity: 0, y: -20, pointerEvents: "none" },
            open: { opacity: 1, y: 0, pointerEvents: "auto" },
          }}
          className="md:hidden absolute left-1/2 mt-2 w-[90%] max-w-6xl -translate-x-1/2 rounded-2xl bg-white p-6 shadow-lg"
        >
          {navLinks.map((link) =>
            link.modal ? (
              <li key={link.id} className="py-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    toggleModal();
                  }}
                  className="block w-full text-left text-lg font-medium text-gray-800 hover:text-[#00533F]"
                >
                  {link.label}
                </button>
              </li>
            ) : (
              <li key={link.id} className="py-2">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-[#00533F]"
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </motion.ul>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:py-24">
          <motion.h1
            variants={wordVariant}
            initial="hidden"
            animate="visible"
            className="text-center text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {"Taglines".split("").map((ch, i) => (
              <motion.span key={i} variants={letterVariant}>
                {ch}
              </motion.span>
            ))}
          </motion.h1>
          <motion.img
            src="/images/image 1.png"
            alt=""
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-4xl "
          />
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-start text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 mt-20 ml-6 md:ml-12 max-w-6xl">
          About INFO Education Platform
        </h1>

        <div className="mx-4 md:mx-12 my-12 rounded-[2rem] shadow-md overflow-hidden bg-white flex flex-col md:flex-row">
          <div className="w-full md:w-full h-[200px]  md:h-[500px]">
            <img
              src="/images/image.svg"
              alt="Hope in Action"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
      {/* <HopeInAction/> */}

      <div className="max-w-8xl mx-auto px-4 mt-24">
        <div className="bg-gray-300 rounded-xl px-4 shadow-xl mb-8 h-[20rem] sm:h-[48rem] md:h-[56rem] lg:h-[60rem] mx-0 sm:mx-12"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className=""
      >
        <h1 className="text-center text-4xl md:text-5xl font-semibold mb-8 mt-40">
          Support Students
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 my-12 px-4 sm:px-12 max-w-8xl mx-auto">
          {students.map((stu, idx) => (
            <motion.div
              key={stu.id}
              className="bg-gray-200 rounded-2xl p-4 shadow-md w-full"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white h-78 sm:h-90 mb-4 rounded-2xl overflow-hidden">
                <img
                  src={stu.img}
                  alt={stu.name}
                  className="w-full h-full object-cover blur-sm scale-105"
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <p className="font-semibold text-xl md:text-2xl text-emerald-700">
                  {stu.name}
                </p>

                <button
                  onClick={() => setSelectedStudent(stu)}
                  className="mt-3 px-6 py-2 rounded-full bg-emerald-500 flex items-center justify-center"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-white"
                  >
                    <ArrowRight size={28} strokeWidth={2} />
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mb-40 mt-20">
          <motion.button
            className="px-10 py-4 bg-black text-white text-xl rounded-xl hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              key="panel"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <StudentExpandedPanel
                student={{ name: "Maria Rodriguez", img: "/images/img5.jpg" }}
                onClose={() => setSelectedStudent(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <FaqSection />
      <Footer />
    </div>
  );
}
