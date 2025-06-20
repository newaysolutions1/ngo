// HopeInAction.jsx
import React from "react";
import { ArrowUpRight } from "lucide-react"; // optional icon library

const HopeInAction = () => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12 shadow-lg">
      <div className="md:w-1/2 w-full">
        <div className="relative">
          <img
                      src="https://images.unsplash.com/photo-1611080626919-7c9ad76de0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"

            alt="Hope in Action"
            className="rounded-xl w-full h-auto object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/80 px-4 py-2 rounded-xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-green-600">H</span>ope In Action
            </h2>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="bg-green-500 p-3 rounded-full">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          One World, One Mission
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          "One World, One Mission" encapsulates our commitment to a united, sustainable future. 
          At our NGO, we believe that everyone deserves the chance to thrive in a healthy, safe, 
          and supportive world. Our mission transcends borders, cultures, bringing together individuals 
          from all walks of life to tackle global challenges like poverty, healthcare, and environmental 
          sustainability. Through collaborative efforts, we aim to create a world where equality, 
          compassion, and opportunity are accessible to all. Together, we’re building a brighter future, 
          one mission at a time.
        </p>
      </div>
    </div>
  );
};

export default HopeInAction;
