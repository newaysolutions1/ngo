import React from 'react'

const ReelVideo = () => {
  return (
   <>
   <div className="max-w-8xl mx-auto px-4">
  <h1 className="text-center text-4xl font-semibold mb-8 mt-20">
    Join Us!
  </h1>
  <div className="h-[100vh] overflow-y-auto snap-y snap-mandatory">
    <div className="snap-start h-[100vh] flex flex-col justify-between bg-gray-300 rounded-xl px-4 sm:px-6 md:px-8 shadow-xl mb-8 mx-4 sm:mx-6 md:mx-12">
      <div className="flex-1 flex items-center justify-center">
        <video
          className="rounded-xl w-full h-full object-cover"
          controls
          src="/videos/sample.mp4"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-4">
        {["Likes", "Shares", "Comments"].map((item, index) => (
          <div
            key={index}
            className="bg-white text-center text-sm font-semibold rounded-xl py-2 shadow"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
    <div className="snap-start h-[100vh] flex flex-col justify-between bg-gray-300 rounded-xl px-4 sm:px-6 md:px-8 shadow-xl mb-8 mx-4 sm:mx-6 md:mx-12">
      <div className="flex-1 flex items-center justify-center">
        <video
          className="rounded-xl w-full h-full object-cover"
          controls
          src="/videos/sample2.mp4"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        {["Views", "Duration", "Uploaded"].map((item, index) => (
          <div
            key={index}
            className="bg-white text-center text-sm font-semibold rounded-xl py-2 shadow"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default ReelVideo