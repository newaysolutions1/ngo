import { FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { X } from "lucide-react";

export default function Footer() {
    const [open, setOpen] = useState(false);
  
    const toggleModal = () => setOpen(!open);
  return (
    <footer className="">
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={toggleModal} 
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Donate</h3>

            <form
  onSubmit={(e) => {
    e.preventDefault();
    alert("Thank you for your contribution!");
    setOpen(false);
  }}
  className="space-y-6"
>
  <div
    className="
      grid                              
      grid-cols-[auto_1fr]    
      gap-x-6 gap-y-4                 
      sm:max-w-lg
    "
  >
    <label htmlFor="amount" className="self-center text-sm font-medium text-gray-700">
      Amount&nbsp;(₹)
    </label>
    <input
      id="amount"
      type="number"
      placeholder="Amount (₹)"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
      required
    />
    <label htmlFor="name" className="self-center text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      id="name"
      type="text"
      placeholder="Name"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
      required
    />
    <label htmlFor="email" className="self-center text-sm font-medium text-gray-700">
      Email&nbsp;ID
    </label>
    <input
      id="email"
      type="email"
      placeholder="Email ID"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
      required
    />
    <label htmlFor="phone" className="self-center text-sm font-medium text-gray-700">
      Phone&nbsp;Number
    </label>
    <input
      id="phone"
      type="tel"
      placeholder="Phone Number"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
      required
    />
  </div>
  <div className="flex justify-end gap-3">
    <button
      type="button"
      onClick={toggleModal}
      className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md bg-[#00533F] px-4 py-2 text-sm text-white hover:bg-[#00432c]"
    >
      Submit
    </button>
  </div>
</form>


          </div>
        </div>
      )}
      <div className=" mx-3 mb-3 px-4 py-4 md:px-8 py-12 space-y-10 bg-[#064C3A] text-white rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <button  type="button"  onClick={toggleModal} className="inline-flex items-center gap-3 bg-[#0B6149] hover:bg-[#0d6d52] px-6 py-3 rounded-full font-medium shadow-md transition">
            Donate now
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D20D] text-black">
              <FiArrowUpRight />
            </span>
          </button>
        </div>

        <hr className="border-gray/100" />
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between text-sm">
          <div className="flex gap-6 text-md">
          <p>© 2023 Gocinga NGO.</p>
          <a href="/" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" className="hover:underline">
              Terms of Use
            </a>
            </div>
          <nav className="flex flex-wrap ">
               <div className="flex gap-6 text-xl mt-10 sm:mt-0">
            <FaFacebook className="hover:opacity-80 cursor-pointer" />
            <FaLinkedin className="hover:opacity-80 cursor-pointer" />
            <FaXTwitter className="hover:opacity-80 cursor-pointer" />
          </div>
          </nav>
        </div>

        <p className="text-md leading-relaxed ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </footer>
  );
}
