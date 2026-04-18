import { useMemo } from 'react';
import './SummaryBar.css';

export default function SummaryBar({ summary }) {
  const stats = useMemo(() => {
    const total = summary.totalClaims;
    return {
      verifiedPct: Math.round((summary.verified / total) * 100),
      unverifiedPct: Math.round((summary.unverified / total) * 100),
      hallucinatedPct: Math.round((summary.hallucinated / total) * 100),
    };
  }, [summary]);

  const trustColor = summary.trustScore >= 75 ? 'var(--verified)' :
                     summary.trustScore >= 50 ? 'var(--unverified)' : 'var(--hallucinated)';

  return (
    <div className="summary-bar">
      <div className="summary-bar__inner">
        {/* Trust Score */}
        <div className="summary-card summary-card--trust">
          <div className="trust-score" style={{ '--score-color': trustColor }}>
            <svg className="trust-score__ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-card)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={trustColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(summary.trustScore / 100) * 327} 327`}
                transform="rotate(-90 60 60)"
                style={{ filter: `drop-shadow(0 0 6px ${trustColor})` }}
              />
            </svg>
            <div className="trust-score__value">
              <span className="trust-score__number">{summary.trustScore}</span>
              <span className="trust-score__total">/100</span>
            </div>
          </div>
          <div className="summary-card__label">Trust Score</div>
        </div>

        {/* Stat cards */}
        <div className="summary-card summary-card--stat">
          <div className="stat-header">
            <span className="stat-dot stat-dot--verified"></span>
            <span className="stat-label">Verified</span>
            <span className="stat-count">{summary.verified}</span>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar__fill stat-bar__fill--verified"
              style={{ width: `${stats.verifiedPct}%` }}
            ></div>
          </div>
          <span className="stat-pct">{stats.verifiedPct}%</span>
        </div>

        <div className="summary-card summary-card--stat">
          <div className="stat-header">
            <span className="stat-dot stat-dot--unverified"></span>
            <span className="stat-label">Unverified</span>
            <span className="stat-count">{summary.unverified}</span>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar__fill stat-bar__fill--unverified"
              style={{ width: `${stats.unverifiedPct}%` }}
            ></div>
          </div>
          <span className="stat-pct">{stats.unverifiedPct}%</span>
        </div>

        <div className="summary-card summary-card--stat">
          <div className="stat-header">
            <span className="stat-dot stat-dot--hallucinated"></span>
            <span className="stat-label">Hallucinated</span>
            <span className="stat-count">{summary.hallucinated}</span>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar__fill stat-bar__fill--hallucinated"
              style={{ width: `${stats.hallucinatedPct}%` }}
            ></div>
          </div>
          <span className="stat-pct">{stats.hallucinatedPct}%</span>
        </div>
      </div>
    </div>
  );
}
