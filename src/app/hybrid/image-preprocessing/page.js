'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TopNavigation from '@/components/TopNavigation';

export default function ImagePreprocessing() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <TopNavigation />
      <h2 className="md:text-3xl text-xl font-semibold mb-6">Image Preprocessing Flow</h2>

      <div className="flex md:space-x-6 md:flex-row flex-col md:space-y-0 space-x-0 space-y-4 mb-8">
        <motion.div
          className="bg-blue-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('image-load')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">📂 Image Load</p>
        </motion.div>

        <motion.div
          className="bg-green-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('color-conversion')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🎨 Color Conversion</p>
        </motion.div>

        <motion.div
          className="bg-yellow-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('clahe')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🔧 CLAHE Enhancement</p>
        </motion.div>

        <motion.div
          className="bg-red-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('resize')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🔄 Resize</p>
        </motion.div>
      </div>

      <div className="w-full max-w-3xl">
        {activePanel === 'image-load' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">📂 Image Load</h3>
            <p>
              In this step, we load the raw image data from the dataset to be processed. The image will undergo several transformations to prepare it for model input.
            </p>
          </motion.div>
        )}

        {activePanel === 'color-conversion' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🎨 Color Conversion</h3>
            <p>
              The image is converted from BGR to RGB and then to LAB color space. This conversion is essential for effective contrast enhancement using CLAHE.
            </p>
          </motion.div>
        )}

        {activePanel === 'clahe' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🔧 CLAHE Enhancement</h3>
            <p>
              The image is enhanced using Contrast Limited Adaptive Histogram Equalization (CLAHE) on the L-channel of the LAB color space to improve image quality and make the features more distinguishable.
            </p>
          </motion.div>
        )}

        {activePanel === 'resize' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🔄 Resize</h3>
            <p>
              After CLAHE enhancement, the image is resized to a consistent size, ensuring it fits the input requirements of the model and retains important features.
            </p>
          </motion.div>
        )}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 cursor-pointer shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => router.push('/hybrid/preprocessing')}
      >
        🚀 Start Preprocessing
      </button>
    </div>
  );
}
