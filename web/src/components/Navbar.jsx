import './Navbar.css';

export default function Navbar({ onAnalyze, isAnalyzing }) {
  return (
    <nav className="navbar glass">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div className="navbar__logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
              <path d="M12 3v2" />
              <path d="M12 19v2" />
              <path d="M3 12h2" />
              <path d="M19 12h2" />
            </svg>
          </div>
          <div className="navbar__title-group">
            <h1 className="navbar__title">Hallucination Audit Trail</h1>
            <span className="navbar__subtitle">AI-Powered Fact Verification</span>
          </div>
        </div>

        <div className="navbar__actions">
          <button className="navbar__btn navbar__btn--secondary" id="upload-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload
          </button>
          <button
            className="navbar__btn navbar__btn--primary"
            id="analyze-btn"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="navbar__spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Analyze
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
