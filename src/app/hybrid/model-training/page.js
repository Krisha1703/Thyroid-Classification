"use client";
import { pipe } from 'framer-motion';
import React, { useState, useEffect } from 'react';

// Replace this URL with your actual CSV image or keep placeholder
const csvIconURL = '/csv.png'
// Constants for animation and pipeline
const PACKET_COUNT = 30; // Number of packets circulating
const STREAM_SPEED = 0.01; // Speed of packet progress (0 to 1 per frame)
const TOTAL_PHASES = 10; // Total animation phases for packets

// Define the pipeline phases for train steps and ML models
const PHASES_TRAIN_PIPELINE = ['adasyn', 'scaling', 'selectkbest', 'calibration'];
const PHASES_MODELS = ['rf', 'dt', 'svm', 'xgb'];


// Colors for different nodes and packets
const colors = {
  root: '#2563eb',       // Blue for CSV root and split
  pipeline: '#6b7280',   // Bright blue for pipeline lines
  test: '#00B4D8',       // Gray for test data branch
  adasyn: '#f97316',     // Orange
  scaling: '#10b981',    // Green
  selectkbest: '#8b5cf6',// Purple
  calibration: '#ef4444',// Red
  train: '#3b82f6',      // Bright blue for train pipeline lines
  model: '#4b5563',      // Dark gray for models
  evaluate: '#4CAF50',  // Yellow for evaluation
  rf: '#2A9D8F',
  dt: '#E76F51',
  svm: '#F9C74F',
  xgb: '#B5179E',
};

// Positioning of nodes in vertical layout (top to bottom)
const nodes = {
  root: { x: 280, y: 20 },
  split: { x: 280, y: 100 },
  testBranch: { x: 100, y: 220 },
  testEnd: { x: 100, y: 320 },
  trainStages: [
    { x: 280, y: 170, name: 'adasyn' },
    { x: 280, y: 240, name: 'scaling' },
    { x: 280, y: 320, name: 'selectkbest' },
    { x: 280, y: 400, name: 'calibration' },
  ],
  models: [
    { x: 460, y: 200, name: 'rf' },
    { x: 520, y: 240, name: 'dt' },
    { x: 580, y: 300, name: 'svm' },
    { x: 640, y: 350, name: 'xgb' },
  ],
};

// Helper to render different packet shapes per phase
function PacketShape({ phase, x, y }) {
  const size = 12;
  const half = size / 2;
  switch (phase) {
    case 'root':
    case 'splitToTrain':
    case 'splitToTest':
      // Rectangle (CSV packet)
      return <rect x={x - half} y={y - half} width={size} height={size} fill={colors.root} rx={3} ry={3} />;
    case 'adasyn':
      // Diamond
      return (
        <polygon
          points={`${x},${y - half} ${x + half},${y} ${x},${y + half} ${x - half},${y}`}
          fill={colors.adasyn}
        />
      );
    case 'scaling':
      // Circle
      return <circle cx={x} cy={y} r={half} fill={colors.scaling} />;
    case 'selectkbest':
      // Triangle up
      return (
        <polygon
          points={`${x},${y - half} ${x + half},${y + half} ${x - half},${y + half}`}
          fill={colors.selectkbest}
        />
      );
    case 'calibration':
      // Hexagon
      const hexSize = half;
      const hexPoints = [
        [x + hexSize * Math.cos(0), y + hexSize * Math.sin(0)],
        [x + hexSize * Math.cos(Math.PI / 3), y + hexSize * Math.sin(Math.PI / 3)],
        [x + hexSize * Math.cos((2 * Math.PI) / 3), y + hexSize * Math.sin((2 * Math.PI) / 3)],
        [x + hexSize * Math.cos(Math.PI), y + hexSize * Math.sin(Math.PI)],
        [x + hexSize * Math.cos((4 * Math.PI) / 3), y + hexSize * Math.sin((4 * Math.PI) / 3)],
        [x + hexSize * Math.cos((5 * Math.PI) / 3), y + hexSize * Math.sin((5 * Math.PI) / 3)],
      ]
        .map((p) => p.join(','))
        .join(' ');
      return <polygon points={hexPoints} fill={colors.calibration} />;
    case 'rf':
    case 'dt':
    case 'svm':
    case 'xgb':
      // Ellipse for model nodes
      return  null;
    default:
      // Default rectangle
      return <rect x={x - half} y={y - half} width={size} height={size} fill={colors.root} rx={3} ry={3} />;
  }
}

// Component representing a moving packet in the pipeline
function PhasePacket({ phase, progress, id }) {
  // Calculate x,y position depending on phase and progress (0 to 1)
  // We'll use linear interpolation between nodes per phase

  // Helper for linear interpolation
  const lerp = (start, end, t) => start + (end - start) * t;

  // Add slight horizontal jitter for better visibility (avoid overlap)
  const jitter = ((id % 5) - 2) * 5;

  let x = 0,
    y = 0;

  switch (phase) {
    case 'root':
      // Move downward from root node to split node vertically
      x = nodes.root.x + jitter;
      y = lerp(nodes.root.y + 30, nodes.split.y + 30, progress);
      break;
    case 'splitToTrain':
      // Move downward from split to first train stage vertically
      x = nodes.split.x + jitter;
      y = lerp(nodes.split.y + 30, nodes.trainStages[0].y + 15, progress);
      break;
    case 'splitToTest':
      // Move left and down from split to test end
      if (progress < 0.5) {
        // Move horizontally left
        x = lerp(nodes.split.x + jitter, nodes.testBranch.x + jitter, progress * 2);
        y = nodes.split.y + 30;
      } else {
        // Move vertically down
        x = nodes.testBranch.x + jitter;
        y = lerp(nodes.testBranch.y + 15, nodes.testEnd.y, (progress - 0.5) * 2);
      }
      break;
    case 'adasyn':
      // Vertical movement between train stages
      x = nodes.trainStages[0].x + jitter;
      y = lerp(nodes.trainStages[0].y + 15, nodes.trainStages[1].y + 15, progress);
      break;
    case 'scaling':
      x = nodes.trainStages[1].x + jitter;
      y = lerp(nodes.trainStages[1].y + 15, nodes.trainStages[2].y + 15, progress);
      break;
    case 'selectkbest':
      x = nodes.trainStages[2].x + jitter;
      y = lerp(nodes.trainStages[2].y + 15, nodes.trainStages[3].y + 15, progress);
      break;
    case 'calibration':
      // Move right and down from calibration to first model node
      if (progress < 0.6) {
        x = lerp(nodes.trainStages[3].x + jitter, nodes.models[0].x - 20, progress / 0.6);
        y = nodes.trainStages[3].y + 15 + jitter;
      } else {
        // Split horizontally to 4 models
        const modelProgress = (progress - 0.6) / 0.4;
        // Decide which model branch packet belongs to by id % 4
        const modelIndex = id % PHASES_MODELS.length;
        const startX = nodes.models[0].x - 20;
        const endX = nodes.models[modelIndex].x + jitter;
        x = lerp(startX, endX, modelProgress);
        y = lerp(nodes.trainStages[3].y + 15 + jitter, nodes.models[modelIndex].y + 15, modelProgress);
      }
      break;
    case 'rf':
    case 'dt':
    case 'svm':
    case 'xgb':
      // Horizontal movement on each model node
      const modelIndex = PHASES_MODELS.indexOf(phase);
      if (modelIndex === -1) break;
      const startX = nodes.models[modelIndex].x;
      const endX = startX + 40;
      x = lerp(startX, endX, progress);
      y = nodes.models[modelIndex].y + 15 + jitter;
      break;
    default:
      x = 0;
      y = 0;
  }

  return <PacketShape phase={phase} x={x} y={y} />;
}

// Main Component
export default function VerticalHybridModelFlow() {
// State for all packets: store phase and progress for each packet
const [packets, setPackets] = useState([]);

useEffect(() => {
// Initialize packets evenly distributed phases and progress
const initialPackets = [];
for (let i = 0; i < PACKET_COUNT; i++) {
// Assign phase cycling through all phases + root + splitToTrain + splitToTest + models
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
// Cycle phases with offset
const phaseIndex = i % totalPhasesArray.length;
// Random starting progress to spread packets visually
const startProgress = (i / PACKET_COUNT) % 1;
initialPackets.push({
id: i,
phase: totalPhasesArray[phaseIndex],
progress: startProgress,
});
}
setPackets(initialPackets);

// Animate packets every 25 ms (~40fps)
const interval = setInterval(() => {
  setPackets((oldPackets) =>
    oldPackets.map(({ id, phase, progress }) => {
      let newProgress = progress + STREAM_SPEED;
      if (newProgress > 1) {
        newProgress = 0;

        // Cycle phase to next in sequence on reset
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
        const currentIndex = totalPhasesArray.indexOf(phase);
        let nextIndex = (currentIndex + 1) % totalPhasesArray.length;
        return { id, phase: totalPhasesArray[nextIndex], progress: 0 };
      }
      return { id, phase, progress: newProgress };
    })
  );
}, 25);

return () => clearInterval(interval);
}, []);

// Helper: render node label + shape or image
function renderNode(name, x, y) {
if (name === 'root') {
// Show CSV image with label below
return (
<>
<image
href={csvIconURL}
x={x - 24}
y={y - 24}
width={48}
height={48}
style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' }}
/>

</>
);
}
// Else, normal node with circle and label
return (
<>
<circle cx={x} cy={y} r={16} fill={colors.root} />
<text x={x} y={y + 5} textAnchor="middle" fontSize="13" fill="white" style={{ userSelect: 'none' }}>
{name.toUpperCase()}
</text>
</>
);
}

return (
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
{/* Root node */}
{renderNode('root', nodes.root.x, nodes.root.y)}

{/* Split Node - "Train" */}
{(() => {
  const name = "Train";
  const fontSize = 14;
  const paddingX = 10;
  const paddingY = 6;
  const textWidth = name.length * 8;
  const width = textWidth + paddingX * 2;
  const height = fontSize + paddingY * 2;
  const { x, y } = nodes.split;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill={colors.root}
      />
      <text
        x={x}
        y={y + fontSize / 3}
        textAnchor="middle"
        fontSize={fontSize}
        fill="white"
        fontWeight="bold"
        style={{ userSelect: 'none' }}
      >
        {name}
      </text>
    </g>
  );
})()}

{/* Test Branch Node - "Test" */}
{(() => {
  const name = "Test";
  const fontSize = 13;
  const paddingX = 10;
  const paddingY = 5;
  const textWidth = name.length * 8;
  const width = textWidth + paddingX * 2;
  const height = fontSize + paddingY * 2;
  const { x, y } = nodes.testBranch;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill={colors.test}
      />
      <text
        x={x}
        y={y + fontSize / 3}
        textAnchor="middle"
        fontSize={fontSize}
        fill="white"
        fontWeight="bold"
        style={{ userSelect: 'none' }}
      >
        {name}
      </text>
    </g>
  );
})()}

{/* Test End Node - "Evaluate" */}
{(() => {
  const name = "Evaluate";
  const fontSize = 13;
  const paddingX = 12;
  const paddingY = 5;
  const textWidth = name.length * 8;
  const width = textWidth + paddingX * 2;
  const height = fontSize + paddingY * 2;
  const { x, y } = nodes.testEnd;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill={colors.evaluate}
      />
      <text
        x={x}
        y={y + fontSize / 3}
        textAnchor="middle"
        fontSize={fontSize}
        fill="white"
        fontWeight="bold"
        style={{ userSelect: 'none' }}
      >
        {name}
      </text>
    </g>
  );
})()}


  {nodes.trainStages.map(({ x, y, name }) => {
  const paddingX = 10;
  const paddingY = 6;
  const fontSize = 14;
  const textWidth = name.length * 8; // Approximate width per character
  const rectWidth = textWidth + paddingX * 2;
  const rectHeight = fontSize + paddingY * 2;

  return (
    <g key={name}>
      {/* Rounded rectangle */}
      <rect
        x={x - rectWidth / 2}
        y={y - rectHeight / 2}
        width={rectWidth}
        height={rectHeight}
        rx={10}
        ry={10}
        fill={colors[name]}
      />
      {/* Centered text */}
      <text
        x={x}
        y={y + fontSize / 3} // Vertically center text
        textAnchor="middle"
        fontSize={fontSize}
        fill="white"
        style={{ userSelect: 'none', fontWeight: 'bold' }}
      >
        {name}
      </text>
    </g>
  );
})}


  {/* Model nodes */}
{nodes.models.map(({ x, y, name }) => (
  <g key={name}>
    <ellipse cx={x} cy={y} rx={20} ry={14} fill={colors[name]} />
    <text
      x={x}
      y={y + 5}
      textAnchor="middle"
      fontSize="13"
      fill="white"
      fontWeight="bold"
      style={{ userSelect: 'none' }}
    >
      {name.toUpperCase()}
    </text>
  </g>
))}


  {/* Connections: vertical lines */}
  {/* Root to split */}
  <line
    x1={nodes.root.x}
    y1={nodes.root.y + 24}
    x2={nodes.split.x}
    y2={nodes.split.y - 10}
    stroke={colors.pipeline}
    strokeWidth={3}
    strokeLinecap="round"
  />

  {/* Split down to train pipeline */}
  <line
    x1={nodes.split.x}
    y1={nodes.split.y + 10}
    x2={nodes.trainStages[0].x}
    y2={nodes.trainStages[0].y - 15}
    stroke={colors.pipeline}
    strokeWidth={3}
    strokeLinecap="round"
  />

  {/* Train pipeline vertical connections */}
  {nodes.trainStages.map((node, i) => {
    if (i === nodes.trainStages.length - 1) return null;
    return (
      <line
        key={i}
        x1={node.x}
        y1={node.y + 15}
        x2={nodes.trainStages[i + 1].x}
        y2={nodes.trainStages[i + 1].y - 15}
        stroke={colors.pipeline}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  })}

  {/* Split to test branch (left and down) */}
  <polyline
    points={`
      ${nodes.split.x},${nodes.split.y + 20}
      ${nodes.testBranch.x},${nodes.split.y + 20}
      ${nodes.testBranch.x},${nodes.testBranch.y - 13}
    `}
    fill="none"
    stroke={colors.pipeline}
    strokeWidth={3}
    strokeLinecap="round"
  />


  {/* Test vertical line */}
  <line
    x1={nodes.testBranch.x}
    y1={nodes.testBranch.y + 12}
    x2={nodes.testEnd.x}
    y2={nodes.testEnd.y - 12}
    stroke={colors.pipeline}
    strokeWidth={3}
    strokeLinecap="round"
  />

  {/* Calibration to models horizontal backbone line */}

<line
  x1={nodes.trainStages[3].x + 55} // Start just outside the right edge of calib node
  y1={nodes.trainStages[3].y + 0} // Below the node
  x2={Math.max(...nodes.models.map(m => m.x)) + 0}
  y2={nodes.trainStages[3].y + 0}
  stroke={colors.pipeline}
  strokeWidth={3}
  strokeLinecap="round"
/>

{nodes.models.map(({ x, y }) => (
  <line
    key={`v-${x}`}
    x1={x + 0}
    y1={nodes.trainStages[3].y + 0}
    x2={x + 0}
    y2={y + 15} // Just above the model node
    stroke={colors.pipeline}
    strokeWidth={3}
    strokeLinecap="round"
/>
))}





  {/* Render all packets */}
  {packets.map(({ id, phase, progress }) => (
    <PhasePacket key={id} id={id} phase={phase} progress={progress} />
  ))}
</svg>
);
}