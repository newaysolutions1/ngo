import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative,FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "swiper/css";
import "swiper/css/effect-creative";

export default function ImpactSection() {
  const [ref, inView] = useInView({ });
  const swiperRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = () => {
    setIntroDone(true);
    swiperRef.current?.autoplay.start();
  };

  const images = [
    "/images/img6.jpg",
    "/images/img5.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
  ];

  return (
    <section ref={ref} className="my-32">
      <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
        Our Impact
      </h2>

      <motion.div
       initial={{ x: "100%" }}
       animate={inView ? { x: 0 } : {}}


        transition={{ duration: 0.9, ease: "easeOut" }}
        onAnimationComplete={handleIntroComplete}
      >
        <Swiper
          effect="creative"
        //   modules={[Autoplay, EffectCreative]}
          creativeEffect={{
            prev: {
              translate: ["-120%", "30px", 0],
              rotate: [0, 0, -8],
            },
            next: {
              translate: ["120%", "30px", 0],
              rotate: [0, 0, 8],
            },
          }}
          modules={[Autoplay,EffectCreative, FreeMode]}
          loop
          centeredSlides
          freeMode
          grabCursor
          speed={1500}
          autoplay={{ delay: 100, disableOnInteraction: false }}
          onSwiper={(sw) => {
            swiperRef.current = sw;        // save instance
            sw.autoplay.stop();            // pause until intro finishes
          }}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 20 },
            640: { slidesPerView: 1.5, spaceBetween: 30 },
            768: { slidesPerView: 2,    spaceBetween: 40 },
            1024:{ slidesPerView: 2.5,  spaceBetween: 60 },
            1280:{ slidesPerView: 3,    spaceBetween: 80 },
            1536:{ slidesPerView: 3.5,  spaceBetween: 100 },
          }}
          className="px-4 sm:px-6 md:px-8 overflow-visible h-[46rem] mt-10"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="overflow-visible">
              <div className="aspect-[3/4] rounded-3xl shadow-lg bg-gray-300 overflow-visible">
                <img
                  src={src}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
