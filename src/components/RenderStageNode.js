// File: components/RenderStageNode.js
import React from 'react';
import { colors } from './constants';

export default function RenderStageNode({ x, y, name, onClick }) {
  const paddingX = 10;
  const paddingY = 6;
  const fontSize = 14;
  const textWidth = name.length * 8;
  const rectWidth = textWidth + paddingX * 2;
  const rectHeight = fontSize + paddingY * 2;

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <rect x={x - rectWidth / 2} y={y - rectHeight / 2} width={rectWidth} height={rectHeight} rx={10} ry={10} fill={colors[name]} />
      <text x={x} y={y + fontSize / 3} textAnchor="middle" fontSize={fontSize} fill="white" style={{ userSelect: 'none', fontWeight: 'bold' }}>
        {name}
      </text>
    </g>
  );
}