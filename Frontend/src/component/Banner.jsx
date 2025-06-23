import { motion } from "framer-motion";

/* ── image data ─────────────────────────────────────────────────── */
const columns = [
  { img: "/images/c1.png", height: "lg:h-[1000px]" },  // height applies only ≥ lg
  { img: "/images/c2.png", height: "lg:h-[1100px]" },
  { img: "/images/c3.png", height: "lg:h-[1000px]" },
  { img: "/images/c4.png", height: "lg:h-[1000px]" },
];

/* ── component ──────────────────────────────────────────────────── */
export default function Banner() {
  return (
    <section
      className="relative w-full h-auto lg:h-[90rem] overflow-hidden
                 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* dotted overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/dot-bg.png')] bg-repeat opacity-20" />

      {/* ░░ image columns ░░  (horizontal scroll on ≤ md) */}
      <div className="relative z-10 flex gap-4 overflow-x-auto px-4 py-12
                      sm:gap-6 sm:px-6 md:gap-8 md:px-8
                      lg:overflow-visible lg:gap-6 lg:px-12 xl:px-16 2xl:px-24">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ scale: 1.06 }}
            className={`group relative h-[60vh] min-w-[80vw]
                        sm:min-w-[70vw] md:min-w-[50vw]
                        lg:min-w-[32vw] xl:min-w-[25vw] 2xl:min-w-[380px]
                        shrink-0 rounded-[28px] overflow-hidden ${col.height}`}
          >
            <img
              src={col.img}
              alt="EKZARIA banner"
              className="h-full w-full object-cover grayscale
                         group-hover:grayscale-0 transition duration-700 ease-out"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          </motion.div>
        ))}
      </div>

      {/* ── slogan + CTA (flows normally on mobile, absolute on lg) ── */}
      <div className="relative z-10 mt-10 flex flex-col items-start gap-6 px-6 text-white
                      sm:px-8 md:px-12
                      lg:absolute lg:-bottom-10 lg:left-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light leading-tight">
          HEALING LIVES,<br />POWERED<br />BY YOU
        </h1>

        <button className="group relative rounded-xl p-[6px] bg-gradient-to-r from-[#00D1B2] to-[#2AFF7D]">
          <span className="flex h-12 w-40 items-center justify-center rounded-full bg-[#0A0F2C]
                           text-base sm:text-lg font-medium transition group-hover:translate-x-1">
            Join&nbsp;Us
          </span>
        </button>
      </div>

      {/* ── brand lock-up (flows on mobile, absolute on lg) ───────── */}
      <div className="relative z-10 mt-8 flex items-center gap-6 px-6 text-white
                      sm:px-8 md:px-12
                      lg:absolute lg:-bottom-10 lg:right-4 lg:mt-0 lg:gap-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
          EKZARIA&nbsp;<br />NGO
        </h2>

        <button className="group relative rounded-full p-[2px] bg-gradient-to-r from-[#00D1B2] to-[#2AFF7D]">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0F2C]
                           transition-transform group-hover:translate-x-1">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
