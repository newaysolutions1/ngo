import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SiteLoader from "./component/SiteLoader";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Footer from "./component/footer";
import FaqSection from "./component/faqSection";
import HeroWithImage from "./component/HeroImage";
import LocationMap from "./component/map";
import StatsBar from "./component/counter";
import CaseStudies from "./component/caseStudies";
import ReelVideo from "./component/reelVideo";

export default function MedicalPage() {
  const images = [
    "/images/img6.jpg",
    "/images/img5.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
  ];
  const navLinks = [
    { id: 1, label: "Home", href: "#home" },
    { id: 2, label: "Education", href: "/education" },
    { id: 3, label: "Join us", href: "#join" },
  ];
  const wordVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07, 
        delayChildren: 0.2,
      },
    },
  };
  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/image 1.png";
    img.onload = () => setLoading(false);
  }, []);
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  if (loading) return <SiteLoader />;

  return (
    <div className="">
      <header className="relative w-full overflow-hidden bg-gray-300 shadow-sm h-[30rem] sm:h-[35rem] md:h-[35rem] lg:h-[40rem]">
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
           
          </motion.h1>
        </div>
      </header>

      <div className="my-32 ">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
          Our Impact
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
          768:  { slidesPerView: 2.5,   spaceBetween: 40 },
          1024: { slidesPerView: 2.5, spaceBetween: 60 },
          1280: { slidesPerView: 3.5,   spaceBetween: 80 },
          1536: { slidesPerView: 3.5, spaceBetween: 100 },
        }}
        className="px-4 sm:px-6 md:px-8"
      >
       {images.map((src, idx) => (
          <SwiperSlide
            key={idx}
            className="transition-transform duration-700 ease-out"
          >
            <div className="bg-gray-300 h-[26rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[34rem] rounded-3xl shadow-lg overflow-hidden">
              <img
                src={src}
                alt={`Slide ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

        /* Others: even smaller & dimmer */
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) {
          transform: scale(0.85);
          opacity: 0.6;
        }
      `}</style>
      </div>

      <div className="max-w-8xl mx-auto px-4 mb-4">
  <h1 className="text-center text-4xl font-semibold mb-8 mt-20">
    Join&nbsp;Us!
  </h1>

  {/* ─────── Mobile: vertical reel (9:16) ─────── */}
  <div className="lg:hidden mx-4 sm:mx-6 rounded-xl shadow-xl overflow-hidden">
    <div className="bg-gray-300 aspect-[9/14] w-full flex items-center justify-center">
      <span className="text-gray-500 text-sm">Reel placeholder</span>
    </div>
  </div>

  {/* ─────── Desktop: full width with custom height ─────── */}
  <div className="hidden lg:block mx-4 lg:mx-12 rounded-xl shadow-xl overflow-hidden">
    <div className="bg-gray-300 w-full h-[50rem] flex items-center justify-center">
      {/* You can adjust h-[400px] to 350px / 300px as per design */}
      <span className="text-gray-500 text-sm">Video placeholder</span>
    </div>
  </div>
</div>



      {/* <ReelVideo/> */}
      <StatsBar />
      <CaseStudies />
      <HeroWithImage />
      <LocationMap />
      <FaqSection />
      <Footer />
    </div>
  );
}
