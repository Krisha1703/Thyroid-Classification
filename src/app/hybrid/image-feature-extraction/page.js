'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TopNavigation from '@/components/TopNavigation';

export default function FeatureExtraction() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const panelOptions = [
    { key: 'image-load', label: '📂 Load Images', bg: 'bg-yellow-100 hover:bg-yellow-200' },
    { key: 'dl-model-selection', label: '🧠 Select DL Model', bg: 'bg-blue-100 hover:bg-blue-200' },
    { key: 'label-encoding', label: '🏷️ Encode Labels', bg: 'bg-green-100 hover:bg-green-200' },
    { key: 'pca-apply', label: '📉 Apply PCA', bg: 'bg-purple-100 hover:bg-purple-200' },
    { key: 'normalize', label: '🔄 Normalize Features', bg: 'bg-pink-100 hover:bg-pink-200' },
    { key: 'save-csv', label: '💾 Save CSV', bg: 'bg-gray-100 hover:bg-gray-200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <TopNavigation />
      <h2 className="md:text-3xl text-2xl font-semibold mb-6">Feature Extraction Workflow</h2>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {panelOptions.map((panel) => (
          <motion.div
            key={panel.key}
            className={`${panel.bg} rounded-lg p-4 cursor-pointer shadow`}
            onClick={() => setActivePanel(panel.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-center font-semibold">{panel.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        {activePanel === 'image-load' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">📂 Load Preprocessed & Augmented Images</h3>
            <p>Load images that have been resized, CLAHE-enhanced, and augmented for robust training.</p>
          </motion.div>
        )}

        {activePanel === 'dl-model-selection' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">🧠 Select Deep Learning Model</h3>
            <p className="mb-4">Choose a pretrained deep learning model which will be used to extract high-level features from the images. These features are later used for machine learning classification.</p>
          </motion.div>
        )}

        {activePanel === 'label-encoding' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">🏷️ Encode Labels</h3>
            <p>Encode TIRADS or binary class labels using label encoding for ML compatibility.</p>
          </motion.div>
        )}

        {activePanel === 'pca-apply' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">📉 Apply PCA</h3>
            <p>Reduce dimensionality using PCA to compress features into 128/256/512 dimensions.</p>
          </motion.div>
        )}

        {activePanel === 'normalize' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">🔄 Normalize Features</h3>
            <p>Normalize features to a [0, 1] scale using MinMaxScaler before saving.</p>
          </motion.div>
        )}

        {activePanel === 'save-csv' && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-4">💾 Save to CSV</h3>
            <p>Save the final processed and labeled feature set to a CSV file for downstream ML modeling.</p>
          </motion.div>
        )}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 cursor-pointer shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => router.push('/hybrid/dl-model-selection')}
      >
        🚀 Start Feature Extraction
      </button>
    </div>
  );
}
