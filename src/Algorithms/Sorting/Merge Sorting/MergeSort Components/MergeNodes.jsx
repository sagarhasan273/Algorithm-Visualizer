/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';

function MergeNodes({
  x, y, value,
}) {
  if (!x || !y) return null;

  const points = `${x},${y} ${x + 5},${y} ${x + 5},${y + 2.5} ${x},${y + 2.5}`;
  const styleText = {
    transform: 'scale(.12)',
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
        strokeWidth={0.125}
      />
      <text x={x + 1.8} y={y + 1.2} style={styleText} textAnchor="middle" fill="black">
        {value}
      </text>
    </g>
  );
}

export default MergeNodes;
