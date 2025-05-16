'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TopNavigation from '@/components/TopNavigation';

export default function ModelSelection() {
  const router = useRouter();

  // State for managing selected model
  const [selectedModel, setSelectedModel] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [confirmedModel, setConfirmedModel] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Descriptions for each model
  const modelDescriptions = {
    VGG16: "VGG16 is a deep convolutional neural network known for its simplicity and effectiveness. It uses 16 layers and is widely used for image feature extraction.",
    EfficientNetB0: "EfficientNetB0 is a highly efficient and lightweight CNN architecture that balances accuracy and speed, making it ideal for medical imaging tasks."
  };

  // Feature columns for the table
  const featureColumns = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];

const tableData = [
  [9.1234, -0.19764, 3.76413, -4.0419],
  [0.69834, 12.2761, -5.61532, 14.1486],
  [-8.8867, 0.32418, 0.1294, -0.29985],
  [0.94721, -10.1512, 7.77051, 21.0215],
  [0.70291, -3.14786, 4.6384, 0.64827],
];



  // Handle model click
  const handleModelClick = (model) => {
    setSelectedModel(model);
    setAnimationComplete(false); // Reset animation state
  };

  // Handle model selection confirmation
  const handleSelectModel = () => {
    setConfirmedModel(selectedModel);
    setInfoMessage(`✅ You selected the ${selectedModel} model.`);

    // Trigger animation to show image to table transition
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1000); // Wait for the animation to run
  };

  // Handle redirect on "Next" button click
  const handleNextClick = () => {
    // Redirect after clicking the next button
    router.push('/hybrid/feature-extraction');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <TopNavigation />
      <h2 className="text-2xl font-bold mb-4 mt-20">Select a Deep Learning Model</h2>

      {/* Model icons */}
      <div className="flex gap-6 mb-6 flex-wrap justify-center">
        <div
          className="flex flex-col items-center cursor-pointer transition-all duration-300"
          onClick={() => handleModelClick('VGG16')}
        >
          <Image 
            src="/dl-model.png" 
            alt="VGG16 Model" 
            width={128} 
            height={128} 
            className={`mb-2 rounded-lg shadow-md ${confirmedModel === 'VGG16' ? 'bg-green-400' : 'bg-white'}`}
          />
          <span className="text-lg font-semibold">VGG16</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer transition-all duration-300"
          onClick={() => handleModelClick('EfficientNetB0')}
        >
          <Image 
            src="/dl-model.png" 
            alt="EfficientNetB0 Model" 
            width={128} 
            height={128} 
            className={`mb-2 rounded-lg shadow-md ${confirmedModel === 'EfficientNetB0' ? 'bg-green-400' : 'bg-white'}`}
          />
          <span className="text-lg font-semibold">EfficientNetB0</span>
        </div>
      </div>

      {/* Description Panel */}
      {selectedModel && !animationComplete && (
        <div className="fixed left-0 top-0 w-full sm:w-1/4 h-full bg-gray-800 text-white p-6">
          <h3 className="text-xl font-bold mb-4 my-20">Model Description</h3>
          <p>{modelDescriptions[selectedModel]}</p>
          <button
            onClick={handleSelectModel}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl mt-4"
          >
            Select this Model
          </button>
        </div>
      )}

      {/* Animation: Image to Table Transition */}
      {animationComplete && (
        <motion.div
          className="flex justify-center items-center md:flex-row flex-col mt-12 w-5/6 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start w-full max-w-5xl">
            {/* Left Side: Image */}
            <div className="w-full sm:w-1/2 relative">
              <Image
                src="/thyroid-sample.png" 
                alt="Thyroid Image"
                width={400}
                height={400}
                className="rounded-lg shadow-md"
              />

              {/* Red Scanner Line */}
              <motion.div
                className="absolute top-0 left-0 w-5/6 -ml-2 h-1 bg-red-500"
                animate={{ y: ['0%', '4000%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: 'linear'
                }}
              />
            </div>

            {/* Right Side: Empty Table filling with data */}
            <motion.div
              className="w-full sm:w-1/2 overflow-hidden mt-6 sm:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.table
                className="table-auto w-full border-collapse bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
              >
                <thead>
                  <tr>
                    {featureColumns.map((col, idx) => (
                      <th key={idx} className="border md:px-4 md:py-2 p-1  text-center">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Animation: Filling Table Rows */}
                  {tableData.map((row, rowIndex) => (
                      <motion.tr
                        key={rowIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 + rowIndex * 2, duration: 1 }}
                      >
                        {row.map((value, colIndex) => (
                          <td key={colIndex} className="border md:px-4 md:py-2 p-1 text-center">
                            {value}
                          </td>
                        ))}
                      </motion.tr>
                    ))}

                </tbody>
              </motion.table>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 1 }}
          >
            <button
              className="bg-blue-500 text-white px-8 py-3 w-full sm:w-5/6 rounded-xl mx-5 md:mt-20 my-5 cursor-pointer"
              onClick={handleNextClick}
            >
              Next
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
