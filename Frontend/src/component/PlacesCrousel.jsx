// src/components/PlacesCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const images = [
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-1.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-2.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-3.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-4.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-5.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-6.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-7.webp",
  "https://zntlab.com/ribon/wp-content/uploads/2023/03/place-8.webp",
];

export default function PlacesCarousel() {
  return (
    <section className="w-full bg-[#0A0F2C] py-10">
      <Swiper
        modules={[Autoplay]}
        className="mySwiper max-w-6xl mx-auto"
        loop
        centeredSlides
        slidesPerView={1.2}
        spaceBetween={20}
        speed={1000}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            {/* Spin is added via CSS when this slide becomes active */}
            <img
              src={src}
              alt={`Place ${i + 1}`}
              className="max-w-[90%] h-auto rounded-xl shadow-lg"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
