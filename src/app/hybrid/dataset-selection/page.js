'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TopNavigation from '@/components/TopNavigation';

export default function DatasetSelection() {
  const router = useRouter();
  
  // State for managing which dataset is selected
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [infoMessage, setInfoMessage] = useState(""); // State for info message
  const [confirmedDataset, setConfirmedDataset] = useState(null); // State for confirmed dataset

  // Descriptions for each dataset
  const datasetDescriptions = {
    DDTI: "The DDTI dataset includes thyroid ultrasound images with clinical metadata. It helps in evaluating different ML and DL approaches for thyroid classification.",
    TR12345: "The TR12345 dataset contains thyroid ultrasound images with TIRADS labels, allowing for both binary and multiclass classification. It is particularly useful for assessing thyroid nodule characteristics."
  };

  // Handle dataset click
  const handleDatasetClick = (dataset) => {
    setSelectedDataset(dataset); // Set selected dataset
  };

  // Handle selection of dataset
  const handleSelectDataset = () => {
    setConfirmedDataset(selectedDataset); // Confirm the selection
    setInfoMessage(`Good job! You selected the ${selectedDataset} dataset.`);
    
    // Automatically redirect after a short delay
    setTimeout(() => {
      router.push('/hybrid/image-preprocessing'); // Redirect to the next page
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <TopNavigation />
      <h2 className="text-2xl font-bold mb-4">Select a Dataset</h2>

      {/* Folder images for datasets */}
      <div className="flex gap-6 mb-6">
        <div
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 `}
          onClick={() => handleDatasetClick('DDTI')}
        >
          <Image 
            src="/folder.png" 
            alt="DDTI Dataset" 
            width={128} 
            height={128} 
            className={`mb-2 rounded-lg shadow-md ${confirmedDataset === 'DDTI' ? 'bg-green-400' : 'bg-white'}`}
          />
          <span className="text-lg font-semibold">DDTI Dataset</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 `}
          onClick={() => handleDatasetClick('TR12345')}
        >
          <Image 
            src="/folder.png" 
            alt="TR12345 Dataset" 
            width={128} 
            height={128} 
            className={`mb-2 rounded-lg shadow-md ${confirmedDataset === 'TR12345' ? 'bg-green-400' : 'bg-white'}`}
          />
          <span className="text-lg font-semibold">TR12345 Dataset</span>
        </div>
      </div>

      {/* Info Message */}
      {infoMessage && (
        <div className="absolute bottom-10 bg-blue-500 text-white py-2 px-4 z-10 rounded-full shadow-md">
          {infoMessage}
        </div>
      )}

      {/* Left Panel for Dataset Description */}
      {selectedDataset && (
        <div className="fixed left-0 top-0 md:w-1/4 w-2/3 h-full bg-gray-800 text-white p-6">
          <h3 className="text-xl font-bold mb-4 my-20">Dataset Description</h3>
          <p>{datasetDescriptions[selectedDataset]}</p>
          <button
            onClick={handleSelectDataset}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl mt-4"
          >
            Select this Dataset
          </button>
        </div>
      )}
    </div>
  );
}
