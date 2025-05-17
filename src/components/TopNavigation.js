"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TopNavigation() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0 left-0 z-50">
      {/* 🏠 Home Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer transition text-3xl"
        aria-label="Go to homepage"
      >
        <span role="img" aria-label="home">🏠</span>
      </button>

      {/* 💬 Feedback Button */}
     <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("https://forms.gle/ZznjZdozsHycEHLo6")}
      className="text-sm sm:text-base font-semibold text-white bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-600 px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
      aria-label="Give feedback"
    >
      📝 User Feedback
    </motion.button>

    </div>
  );
}
