import React, { useState, useEffect } from "react";
import "swiper/css";
import { motion } from "framer-motion";
import Footer from "./component/footer";
import FaqSection from "./component/faqSection";
import SiteLoader from "./component/SiteLoader";
import { Menu, X } from "lucide-react";
import SupportStudentsSection from "./component/SupportStudent";

export default function EducationPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/img5.jpg";
    img.onload = () => setLoading(false);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <SiteLoader />;

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };
  const wordVariant = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } };

  const navLinks = [
    { id: 1, label: "Home", href: "/education" },
    { id: 2, label: "Medical", href: "/medical" },
    { id: 3, label: "Apply as a Student", modal: true },
  ];
  const toggleModal = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const supports = Array.from(
      form.querySelectorAll('input[name="support"]:checked')
    ).map((el) => el.value);
    formData.set("support", supports.join(", "));
  
    try {
      const res = await fetch("http://localhost:8000/api/students", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
  
      if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Server Error (${res.status}): ${errorText}`);
      }
  
      const data = await res.json();
  
      if (data.success) {
        alert("✅ Thank you! Your application has been submitted.");
        form.reset();
        setOpen(false);
      } else {
        alert(`⚠️ Submission failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert(
        "🚨 Something went wrong while submitting your form.\n\n" +
          (error.message || "Please try again later.")
      );
    }
  };
  

  return (
    <div className="scroll-smooth">
      <nav className={`fixed left-0 z-50 flex w-full items-center justify-between
                    bg-white/30 backdrop-blur-lg ring-1 ring-white/20 shadow-lg
                    px-4 py-3 transition-all duration-300
                    ${scrolled ? "top-0" : "top-10"}
                    ${scrolled
                      ? "md:left-1/2 md:w-[60%] md:-translate-x-1/2 md:rounded-3xl"
                      : "md:left-1/2 md:w-[60%] md:-translate-x-1/2 md:rounded-3xl"}
                    md:px-8 md:py-4`}>
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
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <motion.ul
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{ closed: { opacity: 0, y: -20, pointerEvents: "none" }, open: { opacity: 1, y: 0, pointerEvents: "auto" } }}
          className="md:hidden absolute left-1/2 top-full mt-2 w-full max-w-6xl
                     -translate-x-1/2 rounded-2xl bg-white/90 p-6 shadow-xl"
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
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={toggleModal}>
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none">
              <X size={24} />
            </button>
            <h3 className="text-xl text-center font-semibold mb-4">Apply as a Student</h3>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-4">Full Name</label>
    <input id="name" name="name" type="text" required placeholder="Full Name" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
    <input id="email" name="email" type="email" required placeholder="Email Address" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
    <input id="phone" name="phone" type="tel" required placeholder="Phone Number" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">City & State</label>
    <input id="address" name="address" type="text" placeholder="City & State" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
    <input id="age" name="age" type="number" placeholder="Age" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
    <input id="gender" name="gender" type="text" placeholder="Gender" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution Name</label>
    <input id="institution" name="institution" type="text" placeholder="Institution Name" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
    <input id="course" name="course" type="text" placeholder="Course" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
    <input id="year" name="year" type="text" placeholder="Year" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="performanceScore" className="block text-sm font-medium text-gray-700">Performance</label>
    <input id="performanceScore" name="performanceScore" type="text" placeholder="Performance" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <label htmlFor="challange" className="block text-sm font-medium text-gray-700">Challenges</label>
    <textarea id="challange" name="challange" placeholder="Challenges" className="w-full border px-4 py-2 rounded"></textarea>
  </div>

  <div>
    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Career Goal</label>
    <input id="goal" name="goal" type="text" placeholder="Career Goal" className="w-full border px-4 py-2 rounded" />
  </div>

  <div>
    <span className="block text-sm font-medium text-gray-700 mb-1">Type of Support Required</span>
    {["Financial Aid", "Career Guidance", "Internship / Job Opportunities", "Skill Development / Courses", "Mentorship", "Mental Health Support", "Networking Opportunities"].map((support, idx) => (
      <label key={idx} className="flex items-center gap-2">
        <input id={`support-${idx}`} type="checkbox" name="support" value={support} />
        {support}
      </label>
    ))}
  </div>

  <div>
    <span className="block text-sm font-medium text-gray-700 mb-1">Preferred Communication Mode</span>
    {["email", "phone", "whatsapp", "telegram"].map((method, idx) => (
      <label key={idx} className="flex items-center gap-2">
        <input id={`comm-${idx}`} type="radio" name="communicationMode" value={method} />
        {method.charAt(0).toUpperCase() + method.slice(1)}
      </label>
    ))}
  </div>

  <div>
    <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
    <input id="resume" name="resume" type="file" className="w-full" />
  </div>

  <div>
    <label htmlFor="identity" className="block text-sm font-medium text-gray-700">Identity Proof</label>
    <input id="identity" name="identity" type="file" className="w-full" />
  </div>

  <div>
    <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">Certificate</label>
    <input id="certificate" name="certificate" type="file" className="w-full" />
  </div>
  <div className="flex items-center">
                <input type="checkbox" id="consent" required className="mr-2" />
                <label htmlFor="consent" className="text-gray-700">
                  I agree to be contacted by the Ekzaria team and understand my
                  data will be used only for support purposes.
                </label>
              </div>

  <button type="submit" className="bg-[#00533F] text-white px-4 py-2 rounded">Submit</button>
</form>

          </div>
        </div>
      )}

      <header className="relative w-full overflow-hidden bg-gray-300 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 pt-28 md:pt-36 pb-16">
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
            className="w-full max-w-4xl"
          />
        </div>
      </header>
       <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="ml-23 md:ml-20">
              <h1 className=" text-2xl sm:text-3xl md:text-4xl font-semibold ">
                About INFO Education Platform
              </h1>
              </div>
      
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
      <section className="mx-auto mb-8 max-w-8xl px-4 mt-20">
        <div className="mx-4 rounded-xl shadow-xl overflow-hidden sm:mx-6 lg:hidden">
          <div className="flex aspect-[9/14] w-full items-center justify-center bg-gray-300">
            <span className="text-sm text-gray-500">Reel placeholder</span>
          </div>
        </div>
        <div className="hidden overflow-hidden rounded-xl shadow-xl lg:block lg:mx-12">
          <div className="flex h-[50rem] w-full items-center justify-center bg-gray-300">
            <span className="text-sm text-gray-500">Video placeholder</span>
          </div>
        </div>
      </section>
      <SupportStudentsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
