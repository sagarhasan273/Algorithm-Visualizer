/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

function Node(props) {
  const {
    value, nodes, last, i,
  } = props;
  return (
    <g>
      <circle
        cx={nodes[value][0]}
        cy={nodes[value][1]}
        r="7"
        stroke="black"
        fill="none"
        strokeWidth={(i === last || nodes[value][2] <= 1) ? 0.0 : 0.7}
        style={(i === last) ? { fill: 'rgb(253 153 3)' } : (nodes[value][2] <= 1) ? { fill: 'rgb(0, 189, 9)' } : null}
      />
      <text
        x={nodes[value][0]}
        y={nodes[value][1]}
        style={{
          transform: 'scale(.5)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
          textAnchor: 'middle',
          alignmentBaseline: 'central',
        }}
        fill={(i === last || nodes[value][2] <= 1) ? 'white' : 'black'}
        fontSize={18}
      >{nodes[value][2]}
      </text>
    </g>
  );
}

export default Node;
