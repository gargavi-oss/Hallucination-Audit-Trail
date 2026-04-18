import { STATUS_TOKENS } from '../designTokens.js';
import './ClaimHighlight.css';

export default function ClaimHighlight({ claim, isSelected, onClick }) {
  const config = STATUS_TOKENS[claim.status];

  return (
    <span
      className={`claim-highlight claim-highlight--${claim.status} ${isSelected ? 'claim-highlight--selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${config.label} claim: ${claim.text}`}
    >
      {claim.text}
      <span className="claim-highlight__indicator">
        {config.icon}
      </span>
      
      {/* Glassmorphism Tooltip */}
      <span className="claim-tooltip">
        <span className={`claim-tooltip__status claim-tooltip__status--${claim.status}`}>
          {config.label}
        </span>
        <span className="claim-tooltip__confidence">
          Confidence: {claim.confidence}%
        </span>
      </span>
    </span>
  );
}
