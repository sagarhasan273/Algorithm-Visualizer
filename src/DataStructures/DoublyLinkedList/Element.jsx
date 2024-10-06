export default function Element({ value, index, length }) {
  return (
    <div className={`element element${index}`} style={{ left: `${index * 70}px` }}>
      {index !== length && <div className="line"><div className="arrowHead" /></div>}

      <div className="value">
        {value}
      </div>
      {index !== length && <div className="next"><div className="circle" /></div>}
    </div>
  );
}
