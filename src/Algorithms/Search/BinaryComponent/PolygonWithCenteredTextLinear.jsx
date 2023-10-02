/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';

function calculateCenterX(points) {
  const pointArray = points.split(' ').map((point) => point.split(',').map(Number));
  const xValues = pointArray.map((point) => point[0]);
  return (Math.max(...xValues) + Math.min(...xValues)) / 2;
}

function calculateCenterY(points) {
  const pointArray = points.split(' ').map((point) => point.split(',').map(Number));
  const yValues = pointArray.map((point) => point[1]);
  return (Math.max(...yValues) + Math.min(...yValues)) / 2;
}
function PolygonWithCenteredTextLinear({
  x, y, value, i, mid,
}) {
  if (!x || !y) return null;

  const points = `${x},${y} ${x + 8.9},${y} ${x + 8.9},${y + 4} ${x},${y + 4}`;
  const centerX = calculateCenterX(points);
  const centerY = calculateCenterY(points);

  const styleText = {
    transform: 'scale(.23)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };
  const styleTextI = {
    transform: 'scale(.13)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };

  return (
    <g>
      <polygon
        points={points}
        fill={mid === i ? 'rgb(0, 189, 9)' : 'none'}
        stroke="black"
        strokeWidth={0.1}
      />
      <text x={centerX} y={centerY} style={styleText} textAnchor="middle" fill={mid === i ? 'white' : 'black'}>
        {value}
      </text>
      <text x={centerX} y={centerY - 3.5} style={styleTextI} textAnchor="middle" fill="black">
        {i}
      </text>
      {mid === i ? (
        <text x={centerX} y={centerY + 4} style={styleTextI} textAnchor="middle" fill="black">
          index
        </text>
      ) : null}

    </g>
  );
}

export default PolygonWithCenteredTextLinear;
