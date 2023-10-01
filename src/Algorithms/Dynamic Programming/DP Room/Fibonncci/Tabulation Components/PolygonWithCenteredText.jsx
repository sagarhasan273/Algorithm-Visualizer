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
function PolygonWithCenteredText({
  x, y, dpRenderValue, nodes, index, range,
}) {
  if (!x || !y || range === nodes.length + 1) return null;

  const points = `${x},${y} ${x + 9},${y} ${x + 9},${y + 6} ${x},${y + 6}`;
  const centerX = calculateCenterX(points);
  const centerY = calculateCenterY(points);

  const styleText = {
    transform: 'scale(.253)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };
  let color = '';
  if (index >= 1 && index === range) {
    color = 'rgb(253, 153, 3)';
  }
  if (index >= 1 && index === range - 1) {
    color = 'rgb(0, 174, 255)';
  }
  if (index >= 1 && index === range - 2) {
    color = 'rgb(0, 189, 9)';
  }

  return (
    <g>
      <polygon
        points={points}
        fill={color || 'none'}
        stroke="black"
        strokeWidth={0.1}
      />
      <text x={centerX} y={centerY} style={styleText} textAnchor="middle" fill={(index >= 1 && range - 2 <= index && index <= range) ? 'white' : 'black'}>
        {(index <= range && dpRenderValue.has(nodes[index])) ? dpRenderValue.get(nodes[index]) : 0}
      </text>
      {(index === range && index > 2) ? (
        <text
          x={centerX - 9.5}
          y={centerY + 6}
          style={{
            transform: 'scale(.12)',
            transformOrigin: 'center center',
            transformBox: 'fill-box',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
          }}
          textAnchor="middle"
          fill="black"
        >
          dp[i-2]&nbsp;&nbsp; + &nbsp;&nbsp;dp[i-1]&nbsp;&nbsp; = &nbsp;&nbsp;&nbsp;dp[i]
        </text>
      ) : null}
    </g>
  );
}

export default PolygonWithCenteredText;
