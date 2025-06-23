import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SiteLoader from "./component/SiteLoader";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

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
import PlacesCarousel from "./component/PlacesCrousel";
import ImpactSection from "./component/OurImpact";
import Banner from "./component/Banner";

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

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    new Image().src = "/images/image 1.png";
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
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

  return (
    <div className="scroll-smooth">
      <header
        id="home"
        className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat shadow-sm
                 h-[30rem] sm:h-[35rem] md:h-[35rem] lg:h-[90rem]"
      >
        <Banner className="relative z-10" />{" "}
        <div
          className="pointer-events-none absolute inset-0 z-0
                  bg-gradient-to-b from-black/40 via-black/10 to-black/60"
        />
        <nav
          className={`fixed left-0 z-50 flex w-full items-center justify-between
                    bg-white/30 backdrop-blur-lg ring-1 ring-white/20 shadow-lg
                    px-4 py-3 transition-all duration-300
                    ${scrolled ? "top-0" : "top-10"}
                    ${
                      scrolled
                        ? "md:left-1/2 md:w-[60%] md:-translate-x-1/2 md:rounded-3xl"
                        : "md:left-1/2 md:w-[60%] md:-translate-x-1/2 md:rounded-3xl"
                    }
                    md:px-8 md:py-4`}
        >
          <a href="/" className="text-xl font-bold text-gray-900">
            Ekzaria
          </a>

          <ul className="hidden gap-12 text-lg md:flex">
            {navLinks.map((link) => (
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
            ))}
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

          <motion.ul
            initial={false}
            animate={menuOpen ? "open" : "closed"}
            variants={{
              closed: { opacity: 0, y: -20, pointerEvents: "none" },
              open: { opacity: 1, y: 0, pointerEvents: "auto" },
            }}
            className="md:hidden absolute left-1/2 top-full mt-2 w-full max-w-6xl
                     -translate-x-1/2 rounded-2xl bg-white/90 p-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <li key={link.id} className="py-2">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-lg font-medium text-gray-800 hover:text-[#00533F]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </nav>
      </header>
      <ImpactSection />
      <section className="mx-auto mb-4 max-w-8xl px-4">
        <h2 className="mb-8 mt-20 text-center text-4xl font-semibold">
          Join&nbsp;Us!
        </h2>
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
      <StatsBar />
      <CaseStudies />
      <HeroWithImage />
      <LocationMap />
      <FaqSection />
      <Footer />
    </div>
  );
}
