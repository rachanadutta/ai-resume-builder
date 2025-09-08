import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Card({ title, img, size = "small" }) {
  const navigate = useNavigate();

  const baseClasses =
    "rounded-xl overflow-hidden cursor-pointer transition transform hover:scale-102 bg-white";
  const sizeClasses =
    size === "big"
      ? "w-[320px] h-[480px]"
      : "w-60 h-[320px]";

  return (
    <div className="relative p-[3px] rounded-xl overflow-visible">
      {/* Neon gradient border */}
      <motion.div
        className="absolute -inset-1 rounded-xl blur-sm"
        style={{
          background:
            "linear-gradient(90deg, #F15BB5, #9B5DE5, #FFFFFF, #F15BB5, #9B5DE5)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ repeat: Infinity, duration:10, ease: "linear" }}
      />

      {/* Card content */}
      <div className={`${baseClasses} ${sizeClasses} relative rounded-xl bg-white`}>
        <img
          className="w-full h-2/3 rounded-t-xl shadow-xl"
          src={img}
          alt={title}
        />
        <h2 className="mt-4 ml-4 text-xl font-semibold">{title}</h2>
        <button
          onClick={() => navigate(`/Resume/${title}`)}
          className="rounded cursor-pointer hover:bg-blue-700 bg-blue-600 text-white shadow-md text-center px-5 py-2 mt-8 ml-4"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}

export default Card;
