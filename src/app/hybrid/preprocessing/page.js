"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import TopNavigation from '@/components/TopNavigation';

export default function Preprocessing() {
  const router = useRouter();

  const steps = [
    'Convert to RGB',
    'Resize Image',
    'Convert to LAB',
    'Apply CLAHE',
    'Convert back to RGB',
  ];

  const stepDescriptions = [
    "We change the image so that it shows colors using red, green, and blue – just like how a phone screen shows pictures.",
    "We make the picture smaller or bigger so it fits our program just right. It’s like resizing a photo to fit in a frame.",
    "We change the way colors are stored to help the computer see tiny details better. LAB is just a special way to do that.",
    "We brighten up darker parts of the image so small things are easier to see – kind of like turning up the light on a dark photo.",
    "We go back to the red, green, blue colors so we can show the image normally again and continue our process.",
  ];

  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleNext = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowCompletionMessage(true);
      setTimeout(() => {
        router.push('/hybrid/image-augmentation');
      }, 2000);
    }
  };

  const imageFilterMap = [
    'grayscale-0',
    'grayscale-0 scale-110',
    'grayscale',
    'contrast-150',
    'grayscale-0 contrast-100',
  ];

  const isCurrentStepCompleted = completedSteps.includes(step);
  const scannerColor = isCurrentStepCompleted ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      <TopNavigation />

      <div className="flex flex-col w-full mt-20">

        <div className="flex flex-col md:flex-row w-full md:w-5/6 mx-auto">

          <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
            <div className="relative w-[90%] h-auto transition-all duration-700">
              <Image
                src="/thyroid-sample.png"
                alt="Thyroid Ultrasound"
                width={500}
                height={500}
                className={`rounded-lg shadow-lg object-contain ${imageFilterMap[step]}`}
              />

              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full -ml-1 h-1 ${scannerColor} animate-bounce-vertical`} />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Preprocessing Steps</h2>

            {steps.map((label, index) => (
              <button
                key={label}
                onClick={() => setStep(index)}
                className={`w-full text-left px-4 py-3 rounded-lg shadow transition-colors font-medium ${
                  completedSteps.includes(index)
                    ? 'bg-green-500 text-white'
                    : index === step
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-5/6 mx-auto  px-4">
          {/* Description */}
          <div className="w-full md:mt-10 mt-5">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md w-full">
              <p className="text-md">
                {showCompletionMessage
                  ? "🎉 Great! We completed preprocessing. Next up is Image Augmentation..."
                  : stepDescriptions[step]}
              </p>
            </div>
          </div>

          {/* Section 3: Next Button */}
          {!showCompletionMessage && (
            <div className="w-full md:mt-10 my-5 md:ml-6">
              <button
                onClick={handleNext}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer"
              >
                {step < steps.length - 1 ? 'Next Step' : 'Complete Preprocessing'}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes bounce-vertical {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
        .animate-bounce-vertical {
          animation: bounce-vertical 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
