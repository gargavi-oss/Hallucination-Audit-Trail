import { STATUS_TOKENS } from '../designTokens.js';
import './ClaimInspector.css';

export default function ClaimInspector({ claim }) {
  if (!claim) return null;

  const config = STATUS_TOKENS[claim.status];

  return (
    <div className="inspector" key={claim.id}>
      <div className="inspector__header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h2 className="inspector__title">Claim Inspector</h2>
      </div>

      {/* Status Badge — Semantic Chip */}
      <div className={`inspector__status inspector__status--${claim.status}`}>
        <span className="inspector__status-icon">{config.icon}</span>
        <span className="inspector__status-label">{config.label}</span>
      </div>

      {/* Claim Text */}
      <div className="inspector__section">
        <h3 className="inspector__section-title">Claim</h3>
        <p className="inspector__claim-text">"{claim.text}"</p>
      </div>

      {/* Confidence */}
      <div className="inspector__section">
        <h3 className="inspector__section-title">Confidence</h3>
        <div className="inspector__confidence">
          <div className="inspector__confidence-bar">
            <div
              className={`inspector__confidence-fill inspector__confidence-fill--${claim.status}`}
              style={{ width: `${claim.confidence}%` }}
            />
          </div>
          <span className="inspector__confidence-value">{claim.confidence}%</span>
        </div>
      </div>

      {/* Analysis */}
      <div className="inspector__section">
        <h3 className="inspector__section-title">Analysis</h3>
        <p className="inspector__explanation">{claim.explanation}</p>
      </div>

      {/* Sources */}
      <div className="inspector__section">
        <h3 className="inspector__section-title">
          Sources
          <span className="inspector__source-count">{claim.sources.length}</span>
        </h3>
        {claim.sources.length > 0 ? (
          <ul className="inspector__sources">
            {claim.sources.map((source, i) => (
              <li key={i} className="inspector__source">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inspector__source-link"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="inspector__no-sources">No sources available</p>
        )}
      </div>

      {/* Footer */}
      <div className="inspector__footer">
        <span className="inspector__claim-id">Claim #{claim.id} of 10</span>
      </div>
    </div>
  );
}
