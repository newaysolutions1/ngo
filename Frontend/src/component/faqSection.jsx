import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    q: "Is there free trial available?",
    a: "Absolutely! Our free trial offers you the perfect opportunity to explore all the features and benefits of our product at no cost. Don’t miss out on this chance to see how it can transform your experience!",
  },
  {
    q: "What features are included in the free trial?",
    a: "",
  },
  {
    q: "What features are included in the free trial?",
    a: "",
  },
  {
    q: "Is there a limit to the duration of the free trial?",
    a: "",
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
                <span className="font-semibold text-lg sm:text-xl">
                  {item.q}
                </span>
                {isOpen ? (
                  <FiMinus className="shrink-0 text-xl" />
                ) : (
                  <FiPlus className="shrink-0 text-xl" />
                )}
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
