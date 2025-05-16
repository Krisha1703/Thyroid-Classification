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

export default function VerticalHybridModelFlow() {
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
    <svg
      viewBox="0 0 720 480"
      style={{
        width: '100%',
        height: '90vh',
        background: '#f0f4f8',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgb(0 0 0 / 0.1)',
        marginBlock: '20px',
        padding: '10px',
        overflow: 'hidden',
      }}
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
      {selectedNode && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md w-1/3 absolute top-20 left-1/2">
          <p className="text-md font-medium">
            {nodeDescriptions[selectedNode]}
          </p>
        </div>
      )}

       <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 cursor-pointer shadow-lg hover:bg-blue-700 transition-all absolute bottom-20 right-10"
        onClick={() => router.push('/hybrid/model-evaluation')}
      >
        🚀 Evaluate the Model
      </button>
  </>
  );
}
