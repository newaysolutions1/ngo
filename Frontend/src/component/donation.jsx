"use client";

import { ArrowRight } from "lucide-react";

const cards = [
  {
    id: "turkey-syria",
    variant: "solid",
    title: "65%",
    subtitle:
      "17 Thousand People Died,\nThousand Injured, Houses and Buildings Destroyed.",
    body: "Turkey‑Syria Grieves",
    cta: "Donate now",
    foot: "Let them\nbe heard",
  },
  {
    id: "health",
    variant: "image",
    title: "Health",
    body: "Life skills for 2,587 Children in South Africa",
    cta: "",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "join",
    variant: "solid",
    title: "Join 5000+",
    body: "People Donate",
    cta: "Join community",
  },
  {
    id: "education",
    variant: "image",
    title: "Education",
    body: "Sponsor food, education to orphans India",
    cta: "",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "help-home",
    variant: "solid",
    title: "",
    body: "",
    cta: "Explore now",
    foot: "Your home\nfor help",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=60",
  },
];

export default function DonationCarousel() {
  return (
    <section className="w-full overflow-x-auto">
      <ul className="flex gap-6 snap-x snap-mandatory px-4 sm:px-8">
        {cards.map((card) => (
          <li
            key={card.id}
            className="relative shrink-0 w-56 sm:w-64 snap-start rounded-2xl overflow-hidden shadow-lg"
          >
            {card.variant === "image" && card.img && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.img})` }}
              />
            )}
            {card.variant === "image" && (
              <div className="absolute inset-0 bg-black/50" />
            )}
            {card.variant === "solid" && (
              <div
                className={`absolute inset-0
                  ${card.id === "turkey-syria"
                    ? "bg-emerald-900"
                    : card.id === "help-home"
                    ? "bg-lime-400"
                    : "bg-gray-200"}`}
              />
            )}
            <div className="relative h-full flex flex-col justify-between p-5">
              <div>
                {card.title && (
                  <h3 className="text-white text-3xl font-semibold leading-tight whitespace-pre-line">
                    {card.title}
                  </h3>
                )}
                {card.subtitle && (
                  <p className="mt-2 text-sm whitespace-pre-line text-white/90">
                    {card.subtitle}
                  </p>
                )}
              </div>
              <div>
                {card.body && (
                  <p className="mb-4 text-sm font-medium text-white/90">
                    {card.body}
                  </p>
                )}

                {card.cta && (
                  <button
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition
                      ${card.variant === "solid"
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-white/80 text-gray-900 hover:bg-white"}`}
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              {card.foot && (
                <p className="mt-4 text-sm font-medium whitespace-pre-line text-white">
                  {card.foot}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
