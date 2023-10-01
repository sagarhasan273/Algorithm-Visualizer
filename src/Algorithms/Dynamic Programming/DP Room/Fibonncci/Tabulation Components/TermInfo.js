import './TermInfo.scss';

export default function TermInfo({ txt }) {
  return (
    <div className="termInfo">
      <p>{txt}</p>
      <div className="currentBoxColored" /><div style={{ marginBottom: '5px' }}>dp[i]</div>
      <div className="memoBoxColored" /><div style={{ marginBottom: '5px' }}>dp[i-1]</div>
      <div className="leafBoxColored" /><div style={{ marginBottom: '5px' }}>dp[i-2]</div>
    </div>
  );
}
