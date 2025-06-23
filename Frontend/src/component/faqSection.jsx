import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    q: "How can I become a volunteer or donor?",
    a: "You can register via the “Join Us” section on their website by filling out the form with your name, email, phone number, availability, and selecting whether you’re a donor, volunteer, or both. This helps Ek Zaria contact you when relevant needs arise",
  },
  {
    q: "What services or support does Ek Zaria provide?",
    a: " Ek Zaria connects people in need—especially students and patients—with volunteers or donors who can provide:Medical assistance (camps, checkups, medicine)",
  },
  {
    q: "Who founded Ek Zaria and when was it established?",
    a: " The initiative was founded by Anmol Kwatra, Started the NGO 10 years ago, functioning as a not-for-profit entity in Ludhiana",
  },
  {
    q: "Why is it called a “cashless” NGO?",
    a: " Ek Zaria doesn't accept cash or physical donations. Instead, it facilitates support by pairing beneficiaries with donors/volunteers who provide direct help—whether in the form of services, goods, or assistance—ensuring complete transparency and no financial mismanagement",
  },
  {
    q: "What is Ek Zaria?",
    a: "  Ek Zaria is the world’s first “cashless” NGO based in Ludhiana, Punjab, founded by Anmol Kwatra. It acts as an intermediary, connecting underprivileged individuals—particularly patients and students—to donors and volunteers, without directly handling money or material resources",
  },
  {
    q: "How many people has Ek Zaria helped so far?",
    a: " We’ve helped over 100,000 underprivileged patients and people, though no official audited figure is cited",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-4 py-12">
      <div className="mx-auto  rounded-2xl bg-gray-200/70 shadow-sm p-6 sm:p-10">
        <h2 className="text-3xl sm:text-5xl font-semibold text-center">
          Frequently asked questions
        </h2>
        <p className="text-center text-gray-600 text-2xl mt-2 mb-6">
          Everything to you know
        </p>

        {faqData.map((item, idx) => {
  const isOpen = idx === open;
  return (
    <div key={idx} className="border-b last:border-none">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-start"
        onClick={() => setOpen(isOpen ? -1 : idx)}
      >
        <span className="font-semibold text-lg sm:text-xl">{item.q}</span>
        <span
          className={`transition-all duration-300 ease-in-out rounded-full border-2 p-1.5 ${
            isOpen
              ? "rotate-180  bg-gray-200 text-gray-600 border-gray-300"
              : "bg-gray-200 text-gray-600 border-gray-300"
          }`}
        >
          {isOpen ? (
            <FiMinus className="text-xl transition-transform duration-300" />
          ) : (
            <FiPlus className="text-xl transition-transform duration-300" />
          )}
        </span>
      </button>
      {isOpen && item.a && (
        <p className="pb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
          {item.a}
        </p>
      )}
    </div>
  );
})}

      </div>
    </section>
  );
}
