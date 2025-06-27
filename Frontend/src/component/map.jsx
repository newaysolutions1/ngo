"use client";
import { MapPin, Mail, Phone } from "lucide-react";
import ContactCards from "./contactCard";

export default function LocationMap() {
  return (
    <section className="w-full px-8 py-12 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
        Meet us
      </h2>
      <div className="w-full max-w-screen-xl mx-auto overflow-hidden md:rounded-2xl shadow-lg/20 mt-10">
        <iframe
          title="Ek Zaria location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.6172133898595!2d75.8469481752813!3d30.917392179120623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a826ba71cf271%3A0x623b5b0ec583a9ac!2sEk%20Zaria!5e0!3m2!1sen!2sin!4v1718360000000!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
          className="w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] grayscale-[15%] contrast-110"
        />
      </div>

      <ContactCards/>
       
    </section>
  );
}
