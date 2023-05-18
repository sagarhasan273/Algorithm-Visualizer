export default function Element({
  value, index, length, fade,
}) {
  return (
    <div className={`element element${index} ${(index === length - 1) && fade ? 'elementLast' : ''}`} style={{ left: `${index * 50 || -10}px` }}>
      <span>{index}</span>
      <p>
        {value.data}
      </p>
    </div>
  );
}
