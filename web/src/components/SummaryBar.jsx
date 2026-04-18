import { useMemo } from 'react';
import { STATUS_TOKENS } from '../designTokens.js';
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

  // Map trust score to status color via tokens
  const trustColor = summary.trustScore >= 75
    ? STATUS_TOKENS.verified.color
    : summary.trustScore >= 50
    ? STATUS_TOKENS.unverified.color
    : STATUS_TOKENS.hallucinated.color;

  const circumference = 2 * Math.PI * 52; // r=52

  return (
    <div className="summary-bar">
      <div className="summary-bar__inner">
        {/* Trust Score Ring */}
        <div className="summary-card summary-card--trust">
          <div className="trust-score" style={{ '--score-color': trustColor }}>
            <svg className="trust-score__ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-high)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={trustColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(summary.trustScore / 100) * circumference} ${circumference}`}
                transform="rotate(-90 60 60)"
                style={{ filter: `drop-shadow(0 0 8px ${trustColor})`, transition: 'stroke-dasharray 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              />
            </svg>
            <div className="trust-score__value">
              <span className="trust-score__number">{summary.trustScore}</span>
              <span className="trust-score__total">/100</span>
            </div>
          </div>
          <div className="summary-card__label">Trust Score</div>
        </div>

        {/* Stat Cards */}
        {[
          { key: 'verified', label: 'Verified', count: summary.verified, pct: stats.verifiedPct },
          { key: 'unverified', label: 'Unverified', count: summary.unverified, pct: stats.unverifiedPct },
          { key: 'hallucinated', label: 'Hallucinated', count: summary.hallucinated, pct: stats.hallucinatedPct },
        ].map(stat => (
          <div className="summary-card summary-card--stat" key={stat.key}>
            <div className="stat-header">
              <span className={`stat-dot stat-dot--${stat.key}`}></span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-count">{stat.count}</span>
            </div>
            <div className="stat-bar">
              <div
                className={`stat-bar__fill stat-bar__fill--${stat.key}`}
                style={{ width: `${stat.pct}%` }}
              />
            </div>
            <span className="stat-pct">{stat.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
