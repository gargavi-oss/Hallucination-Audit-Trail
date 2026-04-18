import { useMemo } from 'react';
import ClaimHighlight from './ClaimHighlight.jsx';
import './DocumentViewer.css';

export default function DocumentViewer({ document, claims, selectedClaimId, onClaimSelect }) {
  // Build a list of segments: plain text + highlighted claims
  const segments = useMemo(() => {
    const content = document.content;
    const result = [];
    let lastIndex = 0;

    // Sort claims by their position in text
    const sortedClaims = [...claims]
      .map(claim => ({
        ...claim,
        index: content.indexOf(claim.text)
      }))
      .filter(c => c.index !== -1)
      .sort((a, b) => a.index - b.index);

    sortedClaims.forEach(claim => {
      // Add text before this claim
      if (claim.index > lastIndex) {
        result.push({
          type: 'text',
          content: content.substring(lastIndex, claim.index)
        });
      }
      // Add the claim highlight
      result.push({
        type: 'claim',
        claim: claim
      });
      lastIndex = claim.index + claim.text.length;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      result.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }

    return result;
  }, [document.content, claims]);

  return (
    <div className="doc-viewer">
      <div className="doc-viewer__header">
        <div className="doc-viewer__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h2 className="doc-viewer__title">{document.title}</h2>
        <span className="doc-viewer__badge">{claims.length} claims detected</span>
      </div>

      <div className="doc-viewer__content">
        <p className="doc-viewer__text">
          {segments.map((segment, i) => {
            if (segment.type === 'text') {
              return <span key={i}>{segment.content}</span>;
            }
            return (
              <ClaimHighlight
                key={segment.claim.id}
                claim={segment.claim}
                isSelected={segment.claim.id === selectedClaimId}
                onClick={() => onClaimSelect(segment.claim.id)}
              />
            );
          })}
        </p>
      </div>

      <div className="doc-viewer__footer">
        <span className="doc-viewer__legend-item">
          <span className="legend-dot legend-dot--verified"></span> Verified
        </span>
        <span className="doc-viewer__legend-item">
          <span className="legend-dot legend-dot--unverified"></span> Unverified
        </span>
        <span className="doc-viewer__legend-item">
          <span className="legend-dot legend-dot--hallucinated"></span> Hallucinated
        </span>
      </div>
    </div>
  );
}
