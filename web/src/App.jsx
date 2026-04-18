import { useState, useCallback } from 'react';
import mockData from '../../shared/mockData.js';
import Navbar from './components/Navbar.jsx';
import SummaryBar from './components/SummaryBar.jsx';
import DocumentViewer from './components/DocumentViewer.jsx';
import ClaimInspector from './components/ClaimInspector.jsx';
import './App.css';

function App() {
  const [selectedClaimId, setSelectedClaimId] = useState(mockData.claims[0]?.id || 1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);

  const selectedClaim = mockData.claims.find(c => c.id === selectedClaimId) || mockData.claims[0];

  const handleClaimSelect = useCallback((claimId) => {
    setSelectedClaimId(claimId);
  }, []);

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  }, []);

  return (
    <div className="app">
      <Navbar onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      
      {/* Scan overlay */}
      {isAnalyzing && (
        <div className="scan-overlay">
          <div className="scan-content">
            <div className="scan-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                <path d="M12 6V12L16 14"/>
              </svg>
            </div>
            <h2>Analyzing Document</h2>
            <p>Scanning claims and cross-referencing sources...</p>
            <div className="scan-bar-container">
              <div className="scan-bar"></div>
            </div>
          </div>
        </div>
      )}

      {analysisComplete && (
        <>
          <SummaryBar summary={mockData.summary} />
          <main className="main-layout">
            <div className="main-layout__left">
              <DocumentViewer
                document={mockData.document}
                claims={mockData.claims}
                selectedClaimId={selectedClaimId}
                onClaimSelect={handleClaimSelect}
              />
            </div>
            <div className="main-layout__right">
              <ClaimInspector claim={selectedClaim} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
