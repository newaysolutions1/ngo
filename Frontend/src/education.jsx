import React from "react";
import "swiper/css";
import { motion } from "framer-motion";
import Footer from "./component/footer";

export default function EducationPage() {
  return (
    <div className="font-sans">
      <div className="flex justify-center items-start">
        <div className="bg-gray-300 rounded-b-[3rem] w-full min-h-[41rem] relative shadow-md mb-8">
          <nav className="absolute top-10 left-1/2 transform -translate-x-1/2 max-w-6xl w-[90%] flex flex-col md:flex-row justify-between items-center bg-white rounded-3xl p-4 md:p-6 shadow-lg">
            <div className="font-bold text-xl mb-2 md:mb-0">LOGO</div>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-10 text-lg items-center">
              <li className="cursor-pointer hover:underline transition-all">Home</li>
              <li className="cursor-pointer hover:underline transition-all">Education</li>
              <li className="cursor-pointer hover:underline transition-all">Apply as a Student</li>
            </ul>
          </nav>

          <motion.div
            className="absolute top-60 left-1/2 transform -translate-x-1/2 text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Taglines</h1>
          </motion.div>

          <motion.div
            className="absolute top-[25rem] left-1/2 transform -translate-x-1/2 px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img src="/images/image 1.png" alt="" className="w-full max-w-4xl" />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        viewport={{ once: true }}
      >
        <h1 className="text-center text-4xl font-semibold mb-8 mt-20">About</h1>
        <div className="bg-gray-300 mx-4 md:mx-12 rounded-[2rem] px-4 h-[300px] shadow-md"></div>
      </motion.div>

      <motion.div
        className="bg-gray-300 mx-4 md:mx-12 rounded-[2rem] px-4 shadow-2xl my-20 h-[700px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-4xl md:text-5xl font-semibold mb-8 mt-40">Students Section</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 my-12 px-4 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <motion.div
              key={i}
              className="bg-gray-200 rounded-xl p-4 shadow-md w-full"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="bg-white h-48 sm:h-56 mb-4 rounded-3xl"></div>
              <p className="font-semibold text-xl md:text-2xl mt-4 ml-4">Patient Name</p>
              <p className="font-semibold text-xl md:text-2xl ml-4">Age</p>
              <button className="px-4 py-2 bg-black text-white text-base md:text-xl rounded-xl mt-4 ml-4 mb-4">
                Read more
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mb-40 mt-20">
          <motion.button
            className="px-10 py-4 bg-black text-white text-xl rounded-xl hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      </motion.div>
<Footer/>
    </div>
  );
}
