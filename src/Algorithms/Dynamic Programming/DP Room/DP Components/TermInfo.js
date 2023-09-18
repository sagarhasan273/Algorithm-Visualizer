import './TermInfo.scss';

export default function TermInfo({ txt }) {
  return (
    <div className="termInfo">
      <p>{txt}</p>
      <div className="currentBoxColored" /><div>Current Nodes</div>
      <div className="leafBoxColored" /><div>Leaf Nodes</div>
      <div className="memoBoxColored" /><div>Visited Nodes</div>
    </div>
  );
}
