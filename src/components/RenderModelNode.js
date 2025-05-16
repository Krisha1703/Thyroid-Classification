// File: components/RenderModelNode.js
import React from 'react';
import { colors } from './constants';

export default function RenderModelNode({ x, y, name, onClick }) {
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}> 
      <ellipse cx={x} cy={y} rx={20} ry={14} fill={colors[name]} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fill="white" fontWeight="bold" style={{ userSelect: 'none' }}>
        {name.toUpperCase()}
      </text>
    </g>
  );
}