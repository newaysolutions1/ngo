// components/SupportStudentsSection.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import VanillaTilt from "vanilla-tilt";
import StudentExpandedPanel from "./studentExpendPanel";

const FALLBACK_IMG = "/images/img5.jpg";
const ACCENT = "#00D284";
const ACCENT_DARK = "#009b66";

/*************************
 * Tilt-enabled card shell
 *************************/
function TiltStudentCard({ student, onSelect, index }) {
  const cardRef = useRef(null);
  useEffect(() => {
    if (!cardRef.current) return;
    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 500,
      perspective: 1800,
      glare: true,
      "max-glare": 0.08,
      scale: 1.03,
      reset: true,
    });
    return () => cardRef.current?.vanillaTilt?.destroy();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      data-tilt
      className="relative w-full max-w-[380px] rounded-[28px] overflow-hidden cursor-grab shadow-[0_0_0_2px_rgba(0,210,132,0.45),0_0_25px_8px_rgba(0,210,132,0.20)] will-change-transform"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      {/* inner emerald rim */}
      <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-[rgba(0,210,132,0.25)]" />

      {/* image */}
      <div className="relative h-102 rounded-[28px] overflow-hidden">
        <img
          src={student.img}
          alt={student.name}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className="h-full w-full object-cover blur-sm scale-105"
        />
        {/* bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* text + button */}
      <div className="relative z-10 flex flex-col items-center text-center p-4 pb-6">
        <p className="font-semibold text-2xl text-emerald-600 mb-3 drop-shadow">{student.name}</p>
        <button
          onClick={() => onSelect(student)}
          className="rounded-full flex items-center justify-center bg-[var(--accent)] h-11 w-11 mt-4"
          style={{ background: ACCENT }}
        >
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <ArrowRight size={24} color="#fff" />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}

/*************************
 * Main section component
 *************************/
export default function SupportStudentsSection() {
  const [students, setStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/students");
        const approved = (res.data?.data || []).filter((s) => s.status === "approved");
        setStudents(
          approved.map((s) => ({
            ...s,
            img: s.img || FALLBACK_IMG,
          }))
        );
      } catch (err) {
        console.error("Failed fetching students:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const visibleStudents = students.slice(0, visibleCount);
  const hasMore = students.length > visibleCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl animate-pulse">Loading students…</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
      <h1 className="text-center text-4xl md:text-5xl font-semibold mb-10 mt-40">Support Students</h1>

      {students.length === 0 ? (
           <div className="flex flex-col items-center justify-center  text-center px-4">
           {/* <Sad className="w-12 h-12 text-gray-400 mb-4" /> */}
           <h2 className="text-2xl font-semibold text-white mb-2">No Students Found</h2>
           <p className="text-gray-400 max-w-4xl text-2xl">
             Currently, there are no students listed for support. But every child deserves a brighter future. You can be the reason someone smiles tomorrow.
           </p>
           <button
             className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl shadow hover:scale-105 transition-transform"
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
           >
             Explore Other Ways to Help
           </button>
         </div>
     
      ) : (
        <>
          {/* grid */}
          <div className="flex justify-center">
            <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 my-12 px-4 sm:px-12">
              {visibleStudents.map((stu, idx) => (
                <TiltStudentCard key={stu._id} student={stu} onSelect={setSelectedStudent} index={idx} />
              ))}
            </div>
          </div>

          {hasMore && (
            <div className="flex justify-center mb-40 mt-20">
              <motion.button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="px-10 py-4 rounded-xl text-xl text-white transition"
                style={{ background: ACCENT }}
                whileHover={{ scale: 1.05, backgroundColor: ACCENT_DARK }}
                whileTap={{ scale: 0.95 }}
              >
                Load More
              </motion.button>
            </div>
          )}
        </>
      )}

      {/* expanded panel overlay */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <StudentExpandedPanel student={selectedStudent} onClose={() => setSelectedStudent(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
