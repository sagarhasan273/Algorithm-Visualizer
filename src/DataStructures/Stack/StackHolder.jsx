export default function StackHolder({ value, index }) {
  return (
    <div className={`element elementStack${index}`}>
      <p>
        {value}
      </p>
    </div>
  );
}
