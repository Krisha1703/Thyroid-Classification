import PacketShape from "./packet-shape";
import {PHASES_MODELS, nodes} from '@/components/constants.js';

// Component representing a moving packet in the pipeline
export default function PhasePacket({ phase, progress, id }) {
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