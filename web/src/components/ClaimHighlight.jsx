import './ClaimHighlight.css';

const statusIcons = {
  verified: '✓',
  unverified: '?',
  hallucinated: '✕'
};

export default function ClaimHighlight({ claim, isSelected, onClick }) {
  return (
    <span
      className={`claim-highlight claim-highlight--${claim.status} ${isSelected ? 'claim-highlight--selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${claim.status} claim: ${claim.text}`}
    >
      {claim.text}
      <span className="claim-highlight__indicator">
        {statusIcons[claim.status]}
      </span>
      
      {/* Tooltip */}
      <span className="claim-tooltip">
        <span className={`claim-tooltip__status claim-tooltip__status--${claim.status}`}>
          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
        </span>
        <span className="claim-tooltip__confidence">
          Confidence: {claim.confidence}%
        </span>
      </span>
    </span>
  );
}
