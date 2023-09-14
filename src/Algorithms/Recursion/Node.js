/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

function Node(props) {
  const { value, nodes } = props;
  return (
    <g>
      <circle cx={nodes[value][0]} cy={nodes[value][1]} r="7" stroke="black" fill="none" strokeWidth={0.7} />
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
      >{nodes[value][2]}
      </text>
    </g>
  );
}

export default Node;
