export default function Element({
  value, index,
}) {
  return (
    <div className={`element element${index}`} style={{ left: `${index * 50}px` }}>
      <span>{index}</span>
      <p>
        {value.data}
      </p>
    </div>
  );
}
