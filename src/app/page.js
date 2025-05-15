'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(null);

  const renderContent = () => {
    if (activeTab === 'abstract') {
      return (
        <div className="text-left p-4">
          <h2 className="text-xl font-bold mb-2">🧠 Abstract</h2>
          <p>
            This simulation simplifies the behind-the-scenes work of a research project on thyroid nodule classification using ultrasound images. It explores how Machine Learning (ML), Deep Learning (DL), and hybrid models can help distinguish between benign and malignant nodules across two datasets (DDTI and TR12345).
            <br /><br />
            Users can interactively learn how data is processed, features are extracted, and models are trained and evaluated—making complex AI workflows easy to understand and relevant to real-world diagnostics.
          </p>
        </div>
      );
    } else if (activeTab === 'objective') {
      return (
        <div className="text-left p-4">
          <h2 className="text-xl font-bold mb-2">🎯 Objectives</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Explore and compare how <strong>ML, DL,</strong> and <strong>hybrid models</strong> classify thyroid nodules.</li>
            <li>Use the <strong>TIRADS score</strong> to evaluate both binary and multiclass model performance.</li>
            <li>Design a custom <strong>CNN</strong> for binary classification (benign vs malignant).</li>
            <li>Use <strong>pre-trained models</strong> like VGG16 via transfer learning.</li>
            <li>Test models on <strong>two datasets</strong>: DDTI and TR12345.</li>
            <li>Evaluate model <strong>robustness</strong> and ability to generalize.</li>
            <li>Make the entire pipeline <strong>interactive and intuitive</strong> for users of all backgrounds.</li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      {/* Abstract & Objective Buttons */}
      

      {/* Centered Main Content */}
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <h1 className="text-4xl font-bold text-gray-800">Thyroid Nodule Classification Simulation</h1>
        <div className="flex gap-4 w-full">
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('abstract')}
          className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 w-full rounded-2xl shadow-lg transition-all font-medium flex items-center gap-2"
        >
          📄 Abstract
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('objective')}
          className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 w-full rounded-2xl shadow-lg transition-all font-medium flex items-center gap-2"
        >
          🎯 Objective
        </motion.button>

        <motion.a
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          href="https://drive.google.com/file/d/1VX-2VDEAj-mWFzz5LpDjVv_qbSN6PZ4H/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 w-full rounded-2xl shadow-lg transition-all font-medium flex items-center gap-2"
        >
          🧾 View Report
        </motion.a>

        <motion.a
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    href="https://drive.google.com/drive/folders/1D4IArTiPzwnePuxgoDzB4Tdu4JliC80R?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 w-full rounded-2xl shadow-lg transition-all font-medium flex items-center gap-2"
  >
    📁 Project Folder
  </motion.a>

      </div>
        <div className="flex flex-col gap-6 w-64">
          <Link href="/pure-ml">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-3 w-full rounded-2xl shadow-md"
            >
              Pure Machine Learning
            </motion.button>
          </Link>
          <Link href="/hybrid">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white py-3 w-full rounded-2xl shadow-md"
            >
              Hybrid Model (ML + DL)
            </motion.button>
          </Link>
          <Link href="/pure-dl">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white py-3 w-full rounded-2xl shadow-md"
            >
              Pure Deep Learning
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Side Panel */}
      {activeTab && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="absolute top-0 left-0 h-full w-72 bg-white shadow-lg border-r border-gray-200 z-10"
        >
          <div className="flex justify-end p-2">
            <button onClick={() => setActiveTab(null)} className="text-gray-500 hover:text-red-500">
              ✖
            </button>
          </div>
          {renderContent()}
        </motion.div>
      )}
    </main>
  );
}
