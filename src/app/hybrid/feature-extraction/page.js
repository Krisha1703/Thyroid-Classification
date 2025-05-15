'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function FeaturePreprocessing() {
  const router = useRouter();

  const steps = [
    'Label Encoding',
    'Normalization',
    'PCA (Dimensionality Reduction)',
    'Save Features to CSV',
  ];

  const stepDescriptions = [
    'We convert the text labels (e.g., TR1, TR2) into numbers (e.g., 0, 1, 2) so that the machine learning model can understand them.',
    'We scale all feature values to a range between 0 and 1 to make them uniform and comparable.',
    'We reduce the number of features while keeping the most important information — this speeds up and improves model training.',
    'We save the final processed features into a CSV file so they can be used for training the machine learning model.',
  ];

  const originalData = [
  [9.1234, -20.9273, 4.2345, 13.1234],
  [5.0000, 0.0000, 12.5555, -10.0000],
  [15.3245, 8.4321, -5.3456, 18.8888],
  [7.2345, -5.2345, 2.4321, 0.0000]
];

const normalizedData = [
  [0.3797, 0.0000, 0.5852, 0.6944],
  [0.0000, 0.7027, 1.0000, 0.0000],
  [1.0000, 1.0000, 0.0000, 1.0000],
  [0.2507, 0.4371, 0.4979, 0.3721]
];

const pcaData = [
  [0.6123, 0.2034],
  [0.4912, 0.3321],
  [0.9811, 0.4412],
  [0.7324, 0.1800]
];


  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

   const handleNext = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Show message and redirect after 2 seconds
      setShowCompletionMessage(true);
      setTimeout(() => {
        router.push('/hybrid/model-training');
      }, 2000);
    }
  };

  const getBgColor = (index) => {
    if (completedSteps.includes(index)) return 'bg-green-500 text-white';
    if (index === step) return 'bg-blue-500 text-white';
    return 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="flex md:flex-row flex-col w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="md:bg-gray-100  p-6 rounded-lg md:shadow-xl w-full max-w-md">

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex md:justify-between space-x-4  mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg ${activeSlide === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setActiveSlide(0)}
                  >
                    DDTI
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg ${activeSlide === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setActiveSlide(1)}
                  >
                    TR12345
                  </button>
                </div>

                {activeSlide === 0 ? (
                  <>
                    <h4 className="text-lg font-semibold mb-2">DDTI Binary</h4>
                    <table className="table-auto w-full mb-4 border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Label</th>
                          <th className="border px-4 py-2">Encoded</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2">2, 3</td>
                          <td className="border px-4 py-2">0</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">4a, 4b, 4c, 5</td>
                          <td className="border px-4 py-2">1</td>
                        </tr>
                      </tbody>
                    </table>
                    <h4 className="text-lg font-semibold mb-2">DDTI Multiclass</h4>
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Label</th>
                          <th className="border px-4 py-2">Encoded</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[2, 3, '4a', '4b', '4c', 5].map((label, i) => (
                          <tr key={label}>
                            <td className="border px-4 py-2">{label}</td>
                            <td className="border px-4 py-2">{i}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-semibold mb-2">TR12345 Binary</h4>
                    <table className="table-auto w-full mb-4 border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Label</th>
                          <th className="border px-4 py-2">Encoded</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2">TR1, TRnormal</td>
                          <td className="border px-4 py-2">0 (Benign)</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">TR2, TR3, TR4, TR5</td>
                          <td className="border px-4 py-2">1 (Malignant)</td>
                        </tr>
                      </tbody>
                    </table>
                    <h4 className="text-lg font-semibold mb-2">TR12345 Multiclass</h4>
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Label</th>
                          <th className="border px-4 py-2">Encoded</th>
                        </tr>
                      </thead>
                      <tbody>
                        {["TR1", "TR2", "TR3", "TR4", "TR5", "TRnormal"].map((label, i) => (
                          <tr key={label}>
                            <td className="border px-4 py-2">{label}</td>
                            <td className="border px-4 py-2">{i}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="norm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-center">Feature Normalization</h4>
                <div className="overflow-auto rounded shadow p-4 bg-white">
                  <p className="text-sm font-medium mb-2">Before Normalization:</p>
                  <table className="table-auto border-collapse w-full mb-4">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Feature 1</th>
                        <th className="border px-4 py-2">Feature 2</th>
                        <th className="border px-4 py-2">Feature 3</th>
                        <th className="border px-4 py-2">Feature 4</th>
                      </tr>
                    </thead>
                    <tbody>
                        {originalData.map((row, i) => (
                          <tr key={i}>
                            {row.map((val, j) => (
                              <td key={j} className="border px-4 py-2 text-center">
                                {val.toFixed(4)}
                              </td>
                            ))}
                          </tr>
                        ))}
                     </tbody>
                  </table>
                  <p className="text-sm font-medium mb-2">After Normalization (0 to 1):</p>
                  <table className="table-auto border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Feature 1</th>
                        <th className="border px-4 py-2">Feature 2</th>
                        <th className="border px-4 py-2">Feature 3</th>
                        <th className="border px-4 py-2">Feature 4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedData.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td key={j} className="border px-4 py-2 text-center">
                              {val.toFixed(4)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="pca"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-center">PCA Dimensionality Reduction</h4>
                <div className="overflow-auto rounded shadow p-4 bg-white">
                  <p className="text-sm font-medium mb-2">Before PCA (4 features):</p>
                  <table className="table-auto border-collapse w-full mb-4">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">F1</th>
                        <th className="border px-4 py-2">F2</th>
                        <th className="border px-4 py-2">F3</th>
                        <th className="border px-4 py-2">F4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedData.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td key={j} className="border px-4 py-2 text-center">
                              {val.toFixed(4)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm font-medium mb-2">After PCA (2 features):</p>
                  <table className="table-auto border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">PC1</th>
                        <th className="border px-4 py-2">PC2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcaData.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td key={j} className="border px-4 py-2 text-center">
                              {val.toFixed(4)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="save"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-center">Save Features in CSV</h4>
                <Image
                  src="/csv.png"
                  alt="CSV Example"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>

          
        </div>
      </div>

      {/* Timeline Panel */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Feature Extraction Steps</h2>
        <ul className="space-y-4 w-full max-w-sm">
          {steps.map((s, i) => (
            <li
              key={i}
              className={`px-4 py-3 rounded-lg font-medium ${getBgColor(i)}`}
            >
              {s}
            </li>
          ))}
        </ul>
        

          <div className="mt-6 text-center">
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {step === steps.length - 1 ? 'Finish' : 'Next Step'}
            </button>
          </div>

          {/* Step Description */}
         <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md w-full">
          <p className="text-md">
            {showCompletionMessage
              ? "🎉 Great! We completed preprocessing. Next up is Model Training..."
              : stepDescriptions[step]}
          </p>
        </div>
      </div>
    </div>
  );
}
