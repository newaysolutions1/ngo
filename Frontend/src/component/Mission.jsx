import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const HopeInAction = () => {
  return (
    <section className="w-full bg-gray-50 py-12 lg:py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Image and Title */}
          <div className="">
            {/* Main Image */}
            <div className=" rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl w-full">
              <img
                src="/images/image.png"
                alt="Volunteers planting trees together"
                className="w-full h-84 sm:h-80 lg:h-126 "
                priority
              />
            </div>

          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className='w-full lg:w-[75%] '>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                One World, One Mission
              </h2>
              
              <div className="space-y-4 lg:space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base lg:text-lg">
                  "One World, One Mission" Encapsulates Our Commitment To A 
                  United, Sustainable Future. At Our NGO, We Believe That Everyone 
                  Deserves The Chance To Thrive In A Healthy, Safe, And Supportive 
                  World.
                </p>
                
                <p className="text-base lg:text-lg">
                  Our Mission Transcends Borders, Cultures, Bringing Together 
                  Individuals From All Walks Of Life To Tackle Global Challenges Like 
                  Poverty, Healthcare, And Environmental Sustainability.
                </p>
                
                <p className="text-base lg:text-lg">
                  Through Collaborative Efforts, We Aim To Create A World Where Equality, 
                  Compassion, And Opportunity Are Accessible To All. Together, 
                  We're Building A Brighter Future, One Mission At A Time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HopeInAction;