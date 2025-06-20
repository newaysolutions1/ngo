import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactCards = () => {
  return (
    <section className="w-full max-w-screen-xl mx-auto  mt-10">
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="bg-[#064C3A] text-white px-6 py-5 rounded-xl shadow-md text-center space-y-2">
          <div className="flex justify-center items-center gap-2 font-bold text-xl">
            <MapPin className="h-5 w-5" />
            <span>Ek Zaria Foundation</span>
          </div>
          <p className="text-sm font-medium">
            123 ABC Street, Ludhiana, Punjab ‑ 141001
          </p>
        </div>
        <div className="bg-[#064C3A] text-white px-6 py-5 rounded-xl shadow-md text-center space-y-2">
          <div className="flex justify-center items-center gap-2 font-bold text-xl">
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </div>
          <a
            href="mailto:contact@ekzaria.org"
            className="text-sm font-medium underline hover:text-teal-300 transition"
          >
            contact@ekzaria.org
          </a>
        </div>
        <div className="bg-[#064C3A] text-white px-6 py-5 rounded-xl shadow-md text-center space-y-2">
          <div className="flex justify-center items-center gap-2 font-bold text-xl">
            <Phone className="h-5 w-5" />
            <span>Phone</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <a href="tel:+919876543210" className="hover:underline">
              +91&nbsp;98765&nbsp;43210
            </a>
            <span className="hidden xs:inline">|</span>
            <a href="tel:+919123456789" className="hover:underline">
              +91&nbsp;91234&nbsp;56789
            </a>
          </div>
        </div>
      </div>
      <div
        className="hidden sm:flex flex-wrap justify-center sm:justify-around items-center
                   gap-6 sm:gap-10 lg:gap-14
                   bg-[#064C3A] text-white py-10 lg:py-12
                   rounded-[2rem] shadow-xl"
      >
        <div className="text-center min-w-[12rem]">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl lg:text-3xl">
            <MapPin className="h-6 w-6 lg:h-8 lg:w-8" />
            <span>Ek Zaria Foundation</span>
          </div>
          <p className="mt-1 text-base lg:text-lg font-medium">
            123 ABC Street, Ludhiana, Punjab ‑ 141001
          </p>
        </div>
        <div className="text-center min-w-[12rem]">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl lg:text-3xl">
            <Mail className="h-6 w-6 lg:h-8 lg:w-8" />
            <span>Email</span>
          </div>
          <a
            href="mailto:contact@ekzaria.org"
            className="mt-1 text-base lg:text-lg font-medium underline hover:text-teal-300 transition"
          >
            contact@ekzaria.org
          </a>
        </div>
        <div className="text-center min-w-[12rem]">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl lg:text-3xl">
            <Phone className="h-6 w-6 lg:h-8 lg:w-8" />
            <span>Phone</span>
          </div>
          <div className="mt-1 flex flex-col lg:flex-row gap-1 lg:gap-2 text-base lg:text-lg font-medium">
            <a href="tel:+919876543210" className="hover:underline">
              +91&nbsp;98765&nbsp;43210
            </a>
            <span className="hidden lg:inline">|</span>
            <a href="tel:+919123456789" className="hover:underline">
              +91&nbsp;91234&nbsp;56789
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
