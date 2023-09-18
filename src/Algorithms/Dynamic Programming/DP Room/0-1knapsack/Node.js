/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

function Node(props) {
  const {
    value, nodes,
  } = props;
  return (
    <g>
      <circle
        cx={nodes[value][0]}
        cy={nodes[value][1]}
        r="7"
        stroke="black"
        fill="none"
        strokeWidth={(nodes[value][4]) ? 0.0 : 0.7}
        style={(nodes[value][4]) ? { fill: 'rgb(0, 189, 9)' } : null}
      />
      <text
        x={nodes[value][0]}
        y={nodes[value][1]}
        style={{
          transform: 'scale(.3)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
          textAnchor: 'middle',
          alignmentBaseline: 'central',
        }}
        fill={(nodes[value][4]) ? 'white' : 'black'}
        fontSize={18}
      >{nodes[value][3]}
      </text>
    </g>
  );
}

export default Node;
