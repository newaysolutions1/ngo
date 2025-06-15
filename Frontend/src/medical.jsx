import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Mousewheel,
  Keyboard,
  FreeMode,
} from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Footer from "./component/footer";

export default function MedicalPage() {
  const images = [
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-1.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-2.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-3.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-4.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-5.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-6.webp",
    "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-7.webp",
  ];

  return (
    <div className="font-sans">
      <div className="flex justify-center items-start">
        <div className="bg-gray-300 rounded-xl w-full h-[40rem] relative shadow-md mb-8">
          <nav className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-6xl w-full px-6 flex justify-between items-center bg-white rounded-3xl p-6">
            <div className="font-bold text-xl">LOGO</div>
            <ul className="flex space-x-18 text-lg">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Education</li>
              <li className="cursor-pointer">Join us</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Rotated Cards */}
      <div className="my-32 font-sans">
  <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
    Our Impact
  </h1>

  <Swiper
    modules={[Autoplay, FreeMode]}
    loop={true}
    centeredSlides={true}
    freeMode={true}
    grabCursor={true}
    speed={1500}
    autoplay={{
      delay: 10,
      disableOnInteraction: false,
    }}
    breakpoints={{
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 60,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
      1536: {
        slidesPerView: 3.5,
        spaceBetween: 100,
      },
    }}
    className=" px-4 sm:px-6 md:px-8"
  >
    {images.map((src, index) => (
      <SwiperSlide key={index}>
        <div className="bg-gray-300 h-[30rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem] rounded-3xl shadow-lg ribbon-img overflow-hidden">
         
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  <style jsx>{`
    .ribbon-img {
      transition: transform 0.9s ease, opacity 0.5s ease;
    }

    .swiper-slide {
      will-change: transform;
    }

    .swiper-slide-active .ribbon-img {
      transform: translateY(0rem) rotate(0deg);
      opacity: 1;
    }

    .swiper-slide-prev .ribbon-img {
      transform: translateY(2rem) rotate(-6deg);
      opacity: 0.85;
    }

    .swiper-slide-next .ribbon-img {
      transform: translateY(2rem) rotate(6deg);
      opacity: 0.85;
    }

    .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(
        .swiper-slide-next
      )
      .ribbon-img {
      transform: translateY(4rem) scale(0.95);
      opacity: 0.6;
    }
  `}</style>
</div>

      <div>
        <h1 className="text-center text-4xl font-semibold mb-8 mt-20">
          Join Us!
        </h1>
        <div className="bg-gray-300 ml-12 mr-12 rounded-xl px-4 shadow-xl mb-8 h-[700px]"></div>
      </div>
      <div className="flex justify-around items-center bg-gray-200 p-8 rounded-4xl w-[85%] shadow-xl mx-auto text-center text-sm font-semibold">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <div key={idx}>
              <p className="text-5xl font-bold">500</p>
              <p className="text-lg">Hospitals connected</p>
            </div>
          ))}
      </div>
      <div>
        <h1 className="text-center text-5xl font-semibold mb-8 mt-40">
          Our Case Studies
        </h1>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            A11y,
            Autoplay,
            Mousewheel,
            Keyboard,
          ]}
          spaceBetween={40}
          slidesPerView={4}
          mousewheel={true}
          keyboard={true}
          cssMode={true}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <div className="w-70 h-[30rem] bg-gray-200 rounded-xl p-4 shadow-md mx-auto">
                <div className="bg-white h-[16rem] mb-4 rounded-3xl"></div>
                <p className="font-semibold text-2xl ml-8">Patient name</p>
                <p className="font-semibold text-2xl ml-8">Age</p>
                <button className="px-6 py-2 bg-black text-white text-xl rounded-xl mt-4 ml-8">
                  Read more
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <h1 className="text-center text-2xl font-semibold mb-8 mt-40">
          ABOUT Education Initiative
        </h1>
        <div className="bg-gray-300 p-8 rounded-4xl w-[85%] h-130 mx-auto my-8">
          <p className="font-semibold"></p>
        </div>
      </div>
      <div className="text-center mb-8">
        <button className="bg-gray-300 px-24 py-4 rounded-2xl text-2xl font-semibold">
          CTA button
        </button>
      </div>
      <div className="mb-30">
        <h1 className="text-center text-2xl font-semibold mb-12 mt-40">
          Meet us
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 w-[90%] mx-auto gap-6">
          <div className="flex-1">
            <p className="text-2xl font-semibold">
              Adresses of
              <br />
              multiple cities:
            </p>
            <p className="text-2xl font-semibold mt-8">Helpline number</p>
          </div>
          <div className="bg-gray-300 w-full lg:w-[18.5rem] h-[21.25rem] rounded-4xl flex items-center justify-center p-4">
            <p className="text-2xl font-semibold text-center">
              Google maps location
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
