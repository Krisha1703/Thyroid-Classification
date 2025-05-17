import { colors} from '@/components/constants.js';

export default function PacketShape({ phase, x, y }) {
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
      // no packets for model nodes
      return  null;
    default:
      // Default rectangle
      return <rect x={x - half} y={y - half} width={size} height={size} fill={colors.root} rx={3} ry={3} />;
  }
}