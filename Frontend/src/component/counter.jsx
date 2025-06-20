import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 500, suffix: "", label: "Hospitals connected" },
    { end: 50000, suffix: "+", label: "Patients helped" },
    { end: 5, suffix: "M", label: "Donations transferred" },
  ];

  return (
    <section
      ref={ref}
      className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 mb-12"
    >
      <div className="grid grid-cols-2 gap-4 sm:hidden justify-items-center">
        {stats.map(({ end, suffix, label }, idx) => (
          <div
            key={idx}
            className={`bg-[#064C3A] text-white px-4 py-5 rounded-xl text-center shadow-md
                        w-36 sm:w-auto
                        ${
                          idx === stats.length - 1
                            ? "col-span-2 w-3/4 mx-auto"
                            : ""
                        }`}
          >
            <p className="text-3xl sm:text-4xl font-bold leading-tight">
              {inView ? (
                <CountUp end={end} duration={2} separator="," suffix={suffix} />
              ) : (
                0
              )}
            </p>
            <p className="mt-1 text-sm font-semibold">{label}</p>
          </div>
        ))}
      </div>
      <div
        className="hidden sm:flex flex-wrap justify-center sm:justify-around items-center
                   gap-6 sm:gap-10 lg:gap-14
                   bg-[#064C3A] text-white py-10 lg:py-12
                   rounded-[2rem] shadow-xl"
      >
        {stats.map(({ end, suffix, label }, idx) => (
          <div key={idx} className="text-center min-w-[8rem]">
            <p className="font-bold text-5xl lg:text-6xl leading-tight">
              {inView ? (
                <CountUp end={end} duration={2} separator="," suffix={suffix} />
              ) : (
                0
              )}
            </p>
            <p className="mt-1 text-base lg:text-lg font-semibold">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
