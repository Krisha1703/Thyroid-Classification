// File: components/RenderConnections.js
import React from 'react';
import { nodes, colors } from './constants';

export default function RenderConnections() {
  return (
    <>
      <line x1={nodes.root.x} y1={nodes.root.y + 24} x2={nodes.split.x} y2={nodes.split.y - 15} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />
      <line x1={nodes.split.x} y1={nodes.split.y + 15} x2={nodes.trainStages[0].x} y2={nodes.trainStages[0].y - 15} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />

      {nodes.trainStages.map((node, i) => {
        if (i === nodes.trainStages.length - 1) return null;
        return (
          <line key={i} x1={node.x} y1={node.y + 15} x2={nodes.trainStages[i + 1].x} y2={nodes.trainStages[i + 1].y - 15} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />
        );
      })}

   <polyline
        points={`\n
            ${nodes.split.x},75
            ${nodes.testBranch.x},75
            ${nodes.testBranch.x},${nodes.testBranch.y - 13}
        `}
        fill="none"
        stroke={colors.pipeline}
        strokeWidth={3}
        strokeLinecap="round"
     />


      <line x1={nodes.testBranch.x} y1={nodes.testBranch.y + 12} x2={nodes.testEnd.x} y2={nodes.testEnd.y - 12} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />

      <line x1={nodes.trainStages[3].x + 55} y1={nodes.trainStages[3].y} x2={Math.max(...nodes.models.map(m => m.x))} y2={nodes.trainStages[3].y} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />

      {nodes.models.map(({ x, y }) => (
        <line key={`v-${x}`} x1={x} y1={nodes.trainStages[3].y} x2={x} y2={y + 15} stroke={colors.pipeline} strokeWidth={3} strokeLinecap="round" />
      ))}
    </>
  );
}