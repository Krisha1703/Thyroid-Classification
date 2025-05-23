'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import TopNavigation from '@/components/TopNavigation';

export default function Augmentation() {
  const router = useRouter();

  const steps = [
    'Horizontal Flip',
    'Brightness Adjustment',
    'Small Rotation',
    'Zoom In',
    'Shear Transform',
    'Add Noise',
    'Stretch Horizontally',
  ];

  const stepDescriptions = [
    'We flip the image sideways, like looking at it in a mirror. This helps the model learn better from different views.',
    'We slightly change the brightness of the image, making it a bit lighter or darker.',
    'We rotate the image just a little, like tilting your head slightly. This adds variety without losing information.',
    'We zoom into the image, helping the model learn from close-up details.',
    'We apply a small skew or shear, shifting the image to simulate real-life camera angles.',
    'We add small dots of random noise, like grain in an old photo. This helps the model become more robust.',
    'We stretch the image sideways just a bit, like pulling a picture gently. This adds one more helpful variation.',
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
        router.push('/hybrid/image-feature-extraction');
      }, 2000);
    }
  };

  const isCurrentStepCompleted = completedSteps.includes(step);
  const scannerColor = isCurrentStepCompleted ? 'bg-green-500' : 'bg-red-500';

  let imageClass = 'rounded-lg shadow-lg object-contain transition-all duration-700';
  if (completedSteps.includes(0)) imageClass += ' scale-x-[-1]';
  if (completedSteps.includes(1)) imageClass += ' brightness-110';
  if (completedSteps.includes(2)) imageClass += ' rotate-2';
  if (completedSteps.includes(3)) imageClass += ' scale-110';
  if (completedSteps.includes(4)) imageClass += ' skew-x-3';
  if (completedSteps.includes(5)) imageClass += ' blur-[1px]';
  if (completedSteps.includes(6)) imageClass += ' scale-x-105';

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <TopNavigation />

      <div className="flex flex-col w-full mt-20">
        <div className="flex flex-col md:flex-row w-full md:w-5/6 mx-auto">

          {/* Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
            <div className="relative w-[90%] h-auto transition-all duration-700">
              <Image
                src="/thyroid-sample.png"
                alt="Thyroid Augmentation"
                width={500}
                height={500}
                className={imageClass}
              />

              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full -ml-1 h-1 ${scannerColor} animate-bounce-vertical`} />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Augmentation Steps</h2>

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

        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-5/6 mx-auto px-4">
          {/* Description */}
          <div className="w-full md:my-10 mt-5">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md w-full">
              <p className="text-md">
                {showCompletionMessage
                  ? "🎉 Great! We completed augmentation. Next up is Image Feature Extraction..."
                  : stepDescriptions[step]}
              </p>
            </div>
          </div>

          {/* Next Button */}
          {!showCompletionMessage && (
            <div className="w-full md:mt-10 my-5 md:ml-6">
              <button
                onClick={handleNext}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer"
              >
                {step < steps.length - 1 ? 'Next Step' : 'Complete Augmentation'}
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
