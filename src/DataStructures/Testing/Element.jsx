export default function Element({
  value, index, length, fade,
}) {
  return (
    <div className={`element element${index} ${(index === length - 1) && fade ? 'elementLast' : ''}`}>
      <span>{index}</span>
      <p>
        {value}
      </p>
    </div>
  );
}
