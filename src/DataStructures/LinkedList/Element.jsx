export default function Element({ value, index }) {
  return (
    <div className="element" style={{ left: `${index * 70}px` }}>
      <div className="value">
        {value}
      </div>
      <div className="next"><div className="circle" /></div>
    </div>
  );
}
