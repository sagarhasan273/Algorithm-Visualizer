export default function Element({ value, index }) {
  return (
    <div className={`element element${index}`}>
      <span>{index}</span>
      <p>
        {value}
      </p>
    </div>
  );
}
