"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function TopNavigation() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0 left-0 z-50">
      {/* 🏠 Home Button (Top Left) */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer transition text-3xl"
        aria-label="Go to homepage"
      >
        <span role="img" aria-label="home">🏠</span>
      </button>

      {/* 💬 Feedback Button (Top Right, hidden for now) */}
      <button
        onClick={() => console.log("Open Survey")}
        className="hidden text-gray-600 hover:text-gray-800 transition cursor-pointer text-3xl"
        aria-label="Give feedback"
      >
        <span role="img" aria-label="feedback">💬</span>
      </button>
    </div>
  );
}
