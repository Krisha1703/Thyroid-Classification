// File: components/RenderLabelNode.js
import React from 'react';

export default function RenderLabelNode({ name, x, y, color, onClick  }) {
  const fontSize = 14;
  const paddingX = 10;
  const paddingY = 6;
  const textWidth = name.length * 8;
  const width = textWidth + paddingX * 2;
  const height = fontSize + paddingY * 2;

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <rect x={x - width / 2} y={y - height / 2} width={width} height={height} rx={10} ry={10} fill={color} />
      <text x={x} y={y + fontSize / 3} textAnchor="middle" fontSize={fontSize} fill="white" fontWeight="bold" style={{ userSelect: 'none' }}>
        {name}
      </text>
    </g>
  );
}
