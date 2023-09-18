/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export default function LinkedLine(props) {
  const {
    x1, x2, y1, y2, xy, index, val,
  } = props;

  const distance = 8;
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dx = (x2 - x1) / length;
  const dy = (y2 - y1) / length;
  const [ax1, ay1, ax2, ay2] = [x1 + dx * distance,
    y1 + dy * distance, x2 - dx * distance, y2 - dy * distance];

  useEffect(() => {
    document.querySelectorAll(`.animate${index}`).forEach((element) => {
      if (element) { element.beginElement(); }
    });
  }, []);

  return (
    <g>
      <defs>
        <marker id={`arrowhead-220,200368.75,50${xy}`} markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto" markerUnits="strokeWidth"><path d="M 2,0 L 2,4 L 6,2 Z" /></marker>
      </defs>

      <line x1={ax1} y1={ay1} x2={ax2} y2={ay2} markerEnd={`url(#arrowhead-220,200368.75,50${xy})`} stroke="black" strokeWidth={0.7}>
        <animate attributeName="x2" from={ax1} to={ax2} dur="0.2s" repeatCount="1" restart="always" className={`animate${index}`} />
        <animate attributeName="y2" from={ay1} to={ay2} dur="0.2s" repeatCount="1" restart="always" className={`animate${index}`} />
      </line>
      <text
        x={(ax1 + ax2) / 2}
        y={(ay1 + ay2) / 2}
        style={{
          transform: 'scale(.35)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
          textAnchor: 'middle',
          alignmentBaseline: 'central',
          stroke: '#f1f1f1',
          strokeWidth: '5',
          paintOrder: 'stroke',
        }}
      >{(val !== -Infinity)
        ? (val === -1) ? '' : val : '-∞'}
      </text>
    </g>
  );
}
