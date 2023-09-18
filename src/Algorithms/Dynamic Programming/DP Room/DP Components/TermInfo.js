export default function TermInfo({ txt }) {
  return (
    <div className="termInfo">
      <p>{txt}</p>
      <div className="leafBoxColored" /><div>Leaf Nodes</div>
      <div className="memoBoxColored" /><div>Visited Nodes</div>
    </div>
  );
}
