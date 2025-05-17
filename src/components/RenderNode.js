import React from 'react';
import { csvIconURL, colors } from './constants';

export default function RenderNode({ name, x, y, onClick }) {
  if (name === 'root') {
    return (
      <>
        <image
          href={csvIconURL}
          x={x - 24}
          y={y - 24}
          width={48}
          height={48}
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))', cursor: "pointer" }}
          onClick={onClick} 
        />
      </>
    );
  }

return (
    <>
      <circle cx={x} cy={y} r={16} fill={colors.root} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fill="white" style={{ userSelect: 'none' }}>
        {name.toUpperCase()}
      </text>
    </>
  );
} 
