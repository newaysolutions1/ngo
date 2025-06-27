import React from "react";
import bg from "../assets/Background.png";
import Cube1 from "../assets/Cube1.png";
import cube2 from "../assets/cube 2.png";
import rect1 from "../assets/RECT 1.png";
import rect2 from "../assets/rect2.png";
import rect3 from "../assets/rect3.png";
import rect4 from "../assets/rect4.png";
import joinus from "../assets/joinus.png";
import arrow from "../assets/arrowbutton.png";

const EkzariaBanner = () => {
  const cards = [rect4, rect1, rect3, rect2];

  return (
    <div className="elative w-full  h-full sm:h-full md:h-full lg:h-full xl:h-full overflow-hidden bg-black">
      {/* Background */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Card Section */}
      <div className="relative z-10 px-4 sm:px-6 pt-24 pb-10">
        <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-5 justify-center items-end">
          {cards.map((img, i) => (
            <div key={i} className="relative flex-shrink-0">
              {/* Cube Images Positioned Bottom 10px */}
              {(i === 0 || i === 2) && (
           <div
           className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10
             animate-float
             transition-transform duration-500 ease-in-out
             hover:scale-105 "
         >
           <img
             src={i === 0 ? Cube1 : cube2}
             alt={`Cube ${i + 1}`}
             className="w-12 sm:w-20 md:w-24 lg:w-34 xl:w-48 h-auto object-contain transition-all duration-700 ease-in-out"
           />
         </div>
         
            
              )}

              {/* Card Background */}
              <div
                className="relative rounded-[24px] bg-center bg-cover shadow-lg transition-transform duration-500 hover:scale-105
                   w-15 xsm:w-20 sm:w-44 md:w-42 lg:w-54 xl:w-75 2xl:w-95
              h-64 sm:h-72 md:h-100 lg:h-[32rem] xl:h-[52rem] 2xl:h-[55rem]"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right (EKZARIA NGO + Arrow) */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-2 sm:right-4 md:right-6 lg:right-10 z-20 text-white flex items-center gap-3 sm:gap-4 flex-nowrap">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-light leading-tight whitespace-nowrap">
          EKZARIA<br />NGO
        </h1>
        <div className="mt-1 sm:mt-2">
          <button onClick={() => window.scrollBy({ top: 700, behavior: "smooth" })}>
            <div className="flex items-center border border-green-400 rounded-full px-3 py-2 cursor-pointer hover:bg-green-400/10 transition">
              <img
                src={arrow}
                alt="Arrow"
                className="w-6 sm:w-10 md:w-12 lg:w-14 xl:w-26 h-auto object-contain"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Left (Healing Lives + Join Us) */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-2 sm:left-4 md:left-6 lg:left-10 z-20 text-white flex items-center gap-0 sm:gap-3 flex-nowrap">
        <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight max-w-[60%] sm:max-w-xs md:max-w-md">
          HEALING LIVES,<br />POWERED<br />BY YOU
        </h1>
        <div className="mt-6 sm:mt-2">
          <img
            src={joinus}
            alt="Join Us"
            className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-38 h-auto rounded-2xl cursor-pointer hover:opacity-90 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default EkzariaBanner;
