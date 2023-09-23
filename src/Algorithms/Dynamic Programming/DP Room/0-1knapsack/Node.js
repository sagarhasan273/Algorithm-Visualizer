/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

function Node(props) {
  const {
    value, nodes, addProfits, last, index,
  } = props;
  return (
    <g>
      <circle
        cx={nodes[value][0]}
        cy={nodes[value][1]}
        r="7"
        stroke="black"
        fill="none"
        strokeWidth={(nodes[value][4] === 'leaf' || last === index || nodes[value][4] === 'memo') ? 0.0 : 0.4}
        style={(last === index) ? { fill: 'rgb(253, 153, 3)' } : (nodes[value][4] === 'leaf')
          ? { fill: 'rgb(0, 189, 9)' } : (nodes[value][4] === 'memo')
            ? { fill: 'black' } : null}
      />
      <text
        x={nodes[value][0]}
        y={nodes[value][1]}
        style={{
          transform: 'scale(.35)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
          textAnchor: 'middle',
          alignmentBaseline: 'central',
        }}
        fill={(nodes[value][4] === 'leaf' || last === index || nodes[value][4] === 'memo')
          ? 'white' : 'black'}
        fontSize={18}
      >{nodes[value][3]}
      </text>
      {(addProfits.has((nodes[value][0], nodes[value][1]))) ? (
        <text
          x={nodes[value][0] + 12}
          y={nodes[value][1]}
          style={{
            transform: 'scale(.45)',
            transformOrigin: 'center center',
            transformBox: 'fill-box',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
          }}
          fill="black"
          fontSize={10}
        >&nbsp;{(nodes[value][5]) ? '+' : null}&nbsp;{nodes[value][5]}
        </text>
      ) : null}
    </g>
  );
}

export default Node;
