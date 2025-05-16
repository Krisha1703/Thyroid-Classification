'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TopNavigation from '@/components/TopNavigation';

export default function ImageAugmentationFlow() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState(null);

  const steps = [
    { id: 'flip', label: '↔️ Flip', color: 'purple', description: 'Randomly flips the image horizontally or vertically to simulate different orientations of nodules.' },
    { id: 'brightness', label: '💡 Brightness', color: 'yellow', description: 'Alters the brightness of the image to make the model more robust to lighting variations.' },
    { id: 'rotate', label: '🌀 Rotation', color: 'pink', description: 'Applies small random rotations to enhance the model’s ability to recognize rotated nodules.' },
    { id: 'zoom', label: '🔍 Zoom', color: 'blue', description: 'Performs random zoom in/out operations to simulate distance variations in scans.' },
    { id: 'noise', label: '🌫️ Gaussian Noise', color: 'gray', description: 'Adds Gaussian noise to mimic imaging artifacts and improve model generalization.' },
    { id: 'shear', label: '📐 Shear', color: 'red', description: 'Applies a random affine transformation that shears the image, making the model robust to minor angular distortions.' },
    { id: 'stretch', label: '📏 Stretch', color: 'green', description: 'Stretches the image width-wise to simulate various aspect ratios of nodules.' },
  ];
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <TopNavigation />
      <h2 className="md:text-3xl text-2xl font-semibold mb-6">Image Augmentation Flow</h2>

      {/* Augmentation Steps */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {steps.map(({ id, label, color }) => (
          <motion.div
            key={id}
            className={`bg-${color}-200 rounded-lg p-4 cursor-pointer min-w-[140px] text-center`}
            onClick={() => setActivePanel(id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="font-semibold">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Panel Content */}
      <div className="w-full max-w-3xl">
        {steps.map(({ id, label, description }) => (
          activePanel === id && (
            <motion.div
              key={id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xl font-semibold mb-4">{label}</h3>
              <p>{description}</p>
            </motion.div>
          )
        ))}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 cursor-pointer shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => router.push('/hybrid/augmentation')}
      >
        🚀 Start Augmentation
      </button>
    </div>
  );
}
