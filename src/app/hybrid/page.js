'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HybridEntry() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h2 className="md:text-3xl text-xl font-semibold mb-6">Hybrid Modeling Flow</h2>

      {/* Interactive Panels */}
      <div className="flex md:space-x-6 space-x-0 md:space-y-0 space-y-4 mb-8 md:flex-row flex-col justify-center">
        <motion.div
          className="bg-blue-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('dataset')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">📂 Dataset Selection</p>
        </motion.div>

        <motion.div
          className="bg-green-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('preprocessing')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🔧 Image Preprocessing</p>
        </motion.div>

        <motion.div
          className="bg-pink-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('augmentation')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🔄 Augmentation</p>
        </motion.div>

        <motion.div
          className="bg-yellow-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('feature-extraction')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">🔍 Feature Extraction</p>
        </motion.div>

        <motion.div
          className="bg-purple-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('model-training')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">📈 Model Training</p>
        </motion.div>

        <motion.div
          className="bg-red-200 rounded-lg p-4 cursor-pointer"
          onClick={() => setActivePanel('evaluation')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-center font-semibold">⚖️ Evaluation</p>
        </motion.div>
      </div>

      {/* Active Panel Content */}
      <div className="w-full max-w-3xl">
        {activePanel === 'dataset' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">📂 Dataset Selection</h3>
            <p>
              In this step, we select one of the available datasets: DDTI (with clinical metadata) or TR12345 (TIRADS-labeled).
              The dataset plays a crucial role in model training and evaluation.
            </p>
          </motion.div>
        )}

        {activePanel === 'preprocessing' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🔧 Image Preprocessing</h3>
            <p>
              Image preprocessing involves techniques like CLAHE (Contrast Limited Adaptive Histogram Equalization),
              noise reduction, and resizing. This ensures the images are clean and consistent for further processing.
            </p>
          </motion.div>
        )}

        {activePanel === 'augmentation' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🔄 Augmentation</h3>
            <p>
              Augmentation is used to artificially expand the dataset by applying transformations like horizontal flip, 
              brightness variation, rotation, zooming, shearing, noise addition, and stretching. This improves the model 
              robustness and generalization ability.
            </p>
          </motion.div>
        )}

        {activePanel === 'feature-extraction' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">🔍 Feature Extraction</h3>
            <p>
              In this step, we extract key features from the images using pre-trained models like VGG16 or EfficientNetB0.
              These features are then used for model training.
            </p>
          </motion.div>
        )}

        {activePanel === 'model-training' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">📈 Model Training</h3>
            <p>
              Here, the extracted features are fed into machine learning models like Random Forest or Support Vector Machine
              for training. We aim to classify the nodules as benign or malignant.
            </p>
          </motion.div>
        )}

        {activePanel === 'evaluation' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">⚖️ Evaluation</h3>
            <p>
              The final step is evaluating the model performance based on metrics such as accuracy, precision, recall,
              and F1-score. We assess the model ability to classify both binary and multiclass TIRADS labels.
            </p>
          </motion.div>
        )}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 cursor-pointer shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => router.push('/hybrid/dataset-selection')}
      >
        🚀 Start Simulation
      </button>
    </div>
  );
}
