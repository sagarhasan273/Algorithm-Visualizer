/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';

function calculateCenterX(points) {
  const pointArray = points.split(' ').map((point) => point.split(',').map(Number));
  const xValues = pointArray.map((point) => point[0]);
  return (Math.max(...xValues) + Math.min(...xValues)) / 2 - 0.5;
}

function calculateCenterY(points) {
  const pointArray = points.split(' ').map((point) => point.split(',').map(Number));
  const yValues = pointArray.map((point) => point[1]);
  return (Math.max(...yValues) + Math.min(...yValues)) / 2;
}
function MergeNodes({
  x, y, value,
}) {
  if (!x || !y) return null;

  const points = `${x},${y} ${x + 4},${y} ${x + 4},${y + 2} ${x},${y + 2}`;
  const centerX = calculateCenterX(points);
  const centerY = calculateCenterY(points);

  const styleText = {
    transform: 'scale(.1)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };

  return (
    <g>
      <polygon
        points={points}
        fill="none"
        stroke="black"
        strokeWidth={0.1}
      />
      <text x={centerX} y={centerY} style={styleText} fill="black">
        {value}
      </text>

    </g>
  );
}

export default MergeNodes;
