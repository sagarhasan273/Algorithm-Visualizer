/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';

function QuickNodes({
  x, y, value, color, index, i,
}) {
  if (!x || !y || !value) return null;

  const points = `${x},${y} ${x + 5},${y} ${x + 5},${y + 2.5} ${x},${y + 2.5}`;
  const styleText = {
    transform: 'scale(.12)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };
  const styleTextIndex = {
    transform: 'scale(.09)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };
  return (
    <g>
      <polygon
        points={points}
        // fill={color === 'sorted' ? 'rgb(253, 153, 3)' : 'none'}
        fill={color === 'sorted' ? 'rgb(0, 189, 9)' : 'none'}
        stroke={color ? 'white' : 'black'}
        strokeWidth={0.125}
      />
      <text x={x + 1.8} y={y + 1.2} style={styleText} textAnchor="middle" fill={color ? 'white' : 'black'}>
        {value}
      </text>
      {index === 'indexView' ? (
        <text x={x + 1.8} y={y - 1.2} style={styleTextIndex} textAnchor="middle" fill="black">
          {i}
        </text>
      ) : null}

    </g>
  );
}

export default QuickNodes;
