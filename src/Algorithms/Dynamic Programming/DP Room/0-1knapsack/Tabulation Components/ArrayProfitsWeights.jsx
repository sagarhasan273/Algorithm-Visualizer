export default function ArrayProfitsWeights({
  value, name, use, index,
}) {
  if (!value) return null;

  const styleText = {
    alignmentBaseline: 'central',
    fontSize: '2px',
    fontWeight: 'bold',
  };
  if (index === use) {
    styleText.fill = 'red';
    styleText.fontSize = '3px';
  }
  return (
    <g>
      {(value[2] === 0) ? (
        <text
          x={value[0] + 1}
          y={value[1] - 4}
          style={{
            transformOrigin: 'center center',
            transformBox: 'fill-box',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
            transform: 'rotate(55deg)',
            fontSize: '2px',
            fontWeight: 'bold',
          }}
        >
          {name}
        </text>
      ) : null}
      <text x={value[0]} y={value[1]} style={styleText}>
        {value[2]}
      </text>
    </g>
  );
}
