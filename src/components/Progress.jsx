import React from "react";
import { motion } from "framer-motion";
import { User, FileText, Briefcase, Code, GraduationCap, Folder } from "lucide-react";

export default function Progress({ step, setStep ,completedSteps}) {
  const initialSteps = [
    { id: 1, name: "Personal Info", icon: <User size={20} /> },
   
    { id: 2, name: "Experience", icon: <Briefcase size={20} /> },
    { id: 3, name: "Skills", icon: <Code size={20} /> },
    { id: 4, name: "Projects", icon: <Folder size={20} /> },
    { id: 5, name: "Education", icon: <GraduationCap size={20} /> },
     { id: 6, name: "Summary", icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex lg:flex-col md:gap-6 gap-3">
      {initialSteps.map((s) => (
        <motion.div
          key={s.id}
          className="relative flex items-center justify-center group"
        >
          <motion.button
            onClick={() => setStep(s.id)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center 
               ${
      step === s.id
        ? "border-blue-500 text-blue-600"
        : completedSteps.includes(s.id)
        ? "border-black bg-green-500 "
        : "border-gray-400 text-gray-500"
    }`}
            whileHover={{ scale: 1.2 }}
            animate={step === s.id ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={
              step === s.id
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : { type: "spring", stiffness: 300 }
            }
          >
            {s.icon}
          </motion.button>

          {/* Tooltip */}
          <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100">
            {s.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
