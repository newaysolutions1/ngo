import React from 'react'
import { motion } from "framer-motion";

const Footer = () => {
  return (
  <motion.footer
         className="bg-gray-300 p-12 text-center h-80 rounded-[2rem]"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 1 }}
         viewport={{ once: true }}
       >
         <p className="text-xl">Footer Content Here</p>
       </motion.footer>
  )
}

export default Footer