/* eslint-disable max-len */
import keyValue from '../../Components/GenerateKey';

export default function PrintLinkedListAdd({ array, range }) {
  const newArray = new Array([]);
  let index = array.length + 50;
  if (array[array.length - 2] >= 0) {
    index = array[array.length - 2];
  }

  for (let i = 0; i < array.length - 3; i += 1) {
    const x1 = 2 + (25 * (i - 1));
    const x2 = 2 + (25 * i);
    const y1 = 25;
    const y2 = 25;
    const distance = 7;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const dx = (x2 - x1) / length;
    const dy = (y2 - y1) / length;
    const [ax1, ay1, ax2, ay2] = [x1 + dx * distance,
      y1 + dy * distance, x2 - dx * distance, y2 - dy * distance];

    if (i !== 0) {
      newArray.push(
        <g key={keyValue()}>
          <defs>
            <marker id={`arrowhead-220,200368.75,50${x1 + y1}`} markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto" markerUnits="strokeWidth"><path d="M 2,0 L 2,4 L 6,2 Z" /></marker>
          </defs>

          <line x1={ax1} y1={ay1} x2={ax2} y2={ay2} markerEnd={`url(#arrowhead-220,200368.75,50${x1 + y1})`} stroke="black" strokeWidth={0.7}>
            <animate attributeName="x2" from={ax1} to={ax2} dur="0.5s" repeatCount="1" restart="always" className={`animate${i}`} />
            <animate attributeName="y2" from={ay1} to={ay2} dur="0.5s" repeatCount="1" restart="always" className={`animate${i}`} />
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
              strokeWidth: '4',
              paintOrder: 'stroke',
            }}
          />
        </g>,
      );
    }
    newArray.push(
      <g key={keyValue()}>
        <circle
          cx={2 + (25 * i)}
          cy={25}
          r="6"
          stroke={(i === index) ? 'red' : 'black'}
          fill={(i === index) ? 'rgb(253, 153, 3)' : 'none'}
          strokeWidth={0.5}
        >
          <animate attributeName="cx" from={2 + (25 * (i - 1))} to={2 + (25 * i)} dur="0.5s" repeatCount="1" restart="always" className={`animated${i}`} />
        </circle>
        <text
          x={2 + (25 * i)}
          y={25}
          style={{
            transform: 'scale(.4)',
            transformOrigin: 'center center',
            transformBox: 'fill-box',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
          }}
          fontSize={18}
        >{array[i]}
          <animate attributeName="x" from={2 + (25 * (i - 1))} to={2 + (25 * i)} dur="0.5s" repeatCount="1" restart="always" className={`animated${i}`} />
        </text>
      </g>,
    );
    if (i < array.length - 3 && i === index) {
      newArray.push(
        <g key={keyValue()}>
          <circle
            cx={2 + (25 * i)}
            cy={45}
            r="6"
            stroke="black"
            fill="none"
            strokeWidth={0.5}
          >
            <animate attributeName="cx" from={2 + (25 * (i - 1))} to={2 + (25 * i)} dur="0.5s" repeatCount="1" restart="always" className={`animated${i}`} />
          </circle>
          <text
            x={2 + (25 * i)}
            y={45}
            style={{
              transform: 'scale(.4)',
              transformOrigin: 'center center',
              transformBox: 'fill-box',
              textAnchor: 'middle',
              alignmentBaseline: 'central',
            }}
            fontSize={18}
          >{array[array.length - 3]}
            <animate attributeName="x" from={2 + (25 * (i - 1))} to={2 + (25 * i)} dur="0.5s" repeatCount="1" restart="always" className={`animated${i}`} />
          </text>
        </g>,
      );
    }
  }
  if (range === array.length - 2) {
    newArray.push(
      <g key={keyValue()}>
        <circle
          cx={2 + (25 * index)}
          cy={25}
          r="6"
          stroke={(range === index) ? 'red' : 'black'}
          fill={(range === index) ? 'rgb(253, 153, 3)' : 'none'}
          strokeWidth={0.5}
        />
        <text
          x={2 + (25 * index)}
          y={25}
          style={{
            transform: 'scale(.4)',
            transformOrigin: 'center center',
            transformBox: 'fill-box',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
          }}
          fontSize={18}
        >{array[array.length - 3]}
        </text>
      </g>,
    );
    const x1 = 2 + (25 * (index - 1));
    const x2 = 2 + (25 * index);
    const y1 = 25;
    const y2 = 25;
    const distance = 7;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const dx = (x2 - x1) / length;
    const dy = (y2 - y1) / length;
    const [ax1, ay1, ax2, ay2] = [x1 + dx * distance,
      y1 + dy * distance, x2 - dx * distance, y2 - dy * distance];

    newArray.push(
      <g key={keyValue()}>
        <defs>
          <marker id={`arrowhead-220,200368.75,50${x1 + y1}`} markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto" markerUnits="strokeWidth"><path d="M 2,0 L 2,4 L 6,2 Z" /></marker>
        </defs>

        <line x1={ax1} y1={ay1} x2={ax2} y2={ay2} markerEnd={`url(#arrowhead-220,200368.75,50${x1 + y1})`} stroke="black" strokeWidth={0.7}>
          <animate attributeName="x2" from={ax1} to={ax2} dur="0.5s" repeatCount="1" restart="always" className={`animate${index}`} />
          <animate attributeName="y2" from={ay1} to={ay2} dur="0.5s" repeatCount="1" restart="always" className={`animate${index}`} />
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
            strokeWidth: '4',
            paintOrder: 'stroke',
          }}
        />
      </g>,
    );
  }
  return newArray;
}
