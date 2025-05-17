"use client";

import React, { useState, useEffect } from 'react';
import { csvIconURL, PACKET_COUNT, STREAM_SPEED, PHASES_MODELS, colors, nodes, nodeDescriptions } from '@/components/constants';
import PhasePacket from '@/components/phase-packet';
import RenderNode from '@/components/RenderNode';
import RenderLabelNode from '@/components/RenderLabelNode';
import RenderStageNode from '@/components/RenderStageNode';
import RenderModelNode from '@/components/RenderModelNode';
import RenderConnections from '@/components/RenderConnections';
import { useRouter } from 'next/navigation';
import TopNavigation from '@/components/TopNavigation';

export default function pureML() {
  const [packets, setPackets] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
   const router = useRouter();

  useEffect(() => {
    const initialPackets = [];
    const totalPhasesArray = [
      'root',
      'splitToTrain',
      'adasyn',
      'scaling',
      'selectkbest',
      'calibration',
      'splitToTest',
      ...PHASES_MODELS,
    ];

    for (let i = 0; i < PACKET_COUNT; i++) {
      const phaseIndex = i % totalPhasesArray.length;
      const startProgress = (i / PACKET_COUNT) % 1;
      initialPackets.push({
        id: i,
        phase: totalPhasesArray[phaseIndex],
        progress: startProgress,
      });
    }
    setPackets(initialPackets);

    const interval = setInterval(() => {
      setPackets((oldPackets) =>
        oldPackets.map(({ id, phase, progress }) => {
          let newProgress = progress + STREAM_SPEED;
          if (newProgress > 1) {
            const currentIndex = totalPhasesArray.indexOf(phase);
            const nextIndex = (currentIndex + 1) % totalPhasesArray.length;
            return { id, phase: totalPhasesArray[nextIndex], progress: 0 };
          }
          return { id, phase, progress: newProgress };
        })
      );
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <TopNavigation />
    <h2 className="md:text-3xl text-2xl font-bold mb-4 text-gray-800 mt-20 text-center p-4">Model Training Process</h2>
     <div className="w-full relative">
    <svg
      viewBox="0 0 720 480"
      preserveAspectRatio="xMidYMin meet"
     className="w-full h-[90vh] sm:h-[100vh] md:h-[90vh] px-2 overflow-hidden mb-2"

    >

      <RenderNode name="root" x={nodes.root.x} y={nodes.root.y} onClick={() => setSelectedNode("root")}/>
      <RenderLabelNode name="Train" x={nodes.split.x} y={nodes.split.y} color={colors.root} onClick={() => setSelectedNode("train")} />
      <RenderLabelNode name="Test"  x={nodes.testBranch.x} y={nodes.testBranch.y} color={colors.test} onClick={() => setSelectedNode("test")} />
      <RenderLabelNode name="Evaluate" x={nodes.testEnd.x} y={nodes.testEnd.y} color={colors.evaluate} onClick={() => setSelectedNode("evaluate")} />


      {nodes.trainStages.map((stage) => (
        <RenderStageNode key={stage.name} {...stage} onClick={() => setSelectedNode(stage.name)}/>
      ))}
      {nodes.models.map((model) => (
        <RenderModelNode key={model.name} {...model} onClick={() => setSelectedNode(model.name)}/>
      ))}
      <RenderConnections />
      {packets.map((packet) => (
        <PhasePacket key={packet.id} {...packet} />
      ))}
    </svg>

   
  {/* Note Box */}
  {/* Note Box */}
{selectedNode && (
  <div
    className="
      bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md
      w-full md:w-1/3
      md:absolute md:top-10 md:right-20 
      mt-[-55vh] md:mt-0
      z-10
    "
  >
    <p className="text-md font-medium">{nodeDescriptions[selectedNode]}</p>
  </div>
)}


  {/* Evaluate Button */}
  <button
    className="
      bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all
      mt-4 md:mt-0
      w-fit md:absolute md:bottom-20 md:right-10
      mx-auto md:mx-0 block cursor-pointer
    "
    onClick={() => router.push('/pure-ml/model-evaluation')}
  >
    🚀 Evaluate the Model
  </button>
</div>

  </>
  );
}
