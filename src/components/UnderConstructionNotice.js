"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function UnderConstructionNotice() {
  const router = useRouter();

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md shadow-md max-w-xl">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-700 mb-3">
          🚧 Simulation Under Construction
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          The simulation for our <span className="font-semibold">Pure Deep Learning</span> pipeline is currently under construction.
          <br />
          Meanwhile, the <span className="font-semibold text-green-600">Pure ML</span> and <span className="font-semibold text-blue-600">Hybrid Modeling</span> simulations are ready for you to explore!
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/ml")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition-all cursor-pointer"
          >
            🧠 Try the Pure ML Simulation
          </button>
          <button
            onClick={() => router.push("/hybrid")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer"
          >
            ⚡ Try the Hybrid Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
