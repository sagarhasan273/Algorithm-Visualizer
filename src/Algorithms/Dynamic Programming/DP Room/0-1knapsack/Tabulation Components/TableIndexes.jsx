export default function TableIndexex({ x, y, i }) {
  if (!x || !y) return null;

  const styleText = {
    transform: 'scale(.15)',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    textAnchor: 'middle',
    alignmentBaseline: 'central',
  };
  return (
    <text x={x - 5} y={y - 3} style={styleText}>
      {i}
    </text>
  );
}
