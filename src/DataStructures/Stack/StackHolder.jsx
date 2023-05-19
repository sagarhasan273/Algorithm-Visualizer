export default function StackHolder({ value, index }) {
  return (
    <div className={`element elementStack${index} ${index === 0 ? 'stackHolderTop' : ''}`}>
      <p>
        {value}
      </p>
    </div>
  );
}
