export default function StackHolder({ value, index, length }) {
  return (
    <div className={`element elementStack${index} ${index === 0 ? 'stackHolderTop' : ''}`} style={{ top: `-${(length - index) * 35}px` }}>
      <p>
        {value}
      </p>
    </div>
  );
}
