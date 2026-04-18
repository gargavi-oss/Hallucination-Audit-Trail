/* ═══════════════════════════════════════════════════════
   CONTENT SCRIPT — Hallucination Audit Trail
   Full scanning, highlighting, and tooltip experience
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Prevent double initialization
  if (window.__auditTrailInitialized) return;
  window.__auditTrailInitialized = true;

  // ══════════════════════════════════════════════════════
  // STEP 1 — SCANNING OVERLAY
  // ══════════════════════════════════════════════════════

  function showScanOverlay() {
    // Remove any existing overlay
    removeScanOverlay();

    const overlay = document.createElement('div');
    overlay.id = 'audit-scan-overlay';
    overlay.className = 'audit-overlay';
    overlay.innerHTML = `
      <div class="audit-scan-content">
        <div class="audit-scan-icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h2 class="audit-scan-title">Analyzing content...</h2>
        <p class="audit-scan-subtitle">Scanning claims and cross-referencing sources</p>
        <div class="audit-scan-bar-wrapper">
          <div class="scan-bar"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger fade-in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  }

  function removeScanOverlay() {
    const overlay = document.getElementById('audit-scan-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 400);
    }
  }

  // ══════════════════════════════════════════════════════
  // STEP 2 — DETECT CONTENT TYPE
  // ══════════════════════════════════════════════════════

  function detectContentType() {
    const url = window.location.href;
    const contentType = document.contentType || '';

    if (url.toLowerCase().includes('.pdf') || contentType === 'application/pdf') {
      return 'pdf';
    }
    return 'webpage';
  }

  function extractContent() {
    const contentType = detectContentType();

    if (contentType === 'pdf') {
      // For PDFs, we simulate sending the blob to backend
      return {
        type: 'pdf',
        text: `[PDF Document: ${document.title || window.location.href}]`,
        url: window.location.href
      };
    }

    // For normal webpages — extract and clean text
    const text = document.body.innerText || '';
    const cleaned = text
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 10000); // Limit for processing

    return {
      type: 'webpage',
      text: cleaned,
      url: window.location.href
    };
  }

  // ══════════════════════════════════════════════════════
  // STEP 3 — SIMULATE BACKEND CALL
  // ══════════════════════════════════════════════════════

  function simulateAnalysis(input) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Use mock data from shared/mockData.js (loaded via window.auditMockData)
        const data = window.auditMockData || getDefaultMockData();
        resolve(data);
      }, 2000);
    });
  }

  // Fallback mock data in case shared module isn't loaded
  function getDefaultMockData() {
    return {
      claims: [
        { id: 1, text: 'artificial intelligence', status: 'verified', confidence: 92, explanation: 'Well-documented technology field.' },
        { id: 2, text: 'machine learning', status: 'verified', confidence: 88, explanation: 'Established subfield of AI.' },
        { id: 3, text: 'unprecedented accuracy', status: 'unverified', confidence: 45, explanation: 'Vague claim without specific metrics.' },
        { id: 4, text: 'revolutionary breakthrough', status: 'hallucinated', confidence: 15, explanation: 'Exaggerated claim with no supporting evidence.' },
      ],
      summary: { trustScore: 62, totalClaims: 4, verified: 2, unverified: 1, hallucinated: 1 }
    };
  }

  // ══════════════════════════════════════════════════════
  // STEP 4 — HIGHLIGHT CLAIMS IN PAGE
  // ══════════════════════════════════════════════════════

  function highlightClaims(data) {
    const claims = data.claims || [];

    claims.forEach((claim) => {
      if (!claim.text) return;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            // Skip our own overlay/badge elements
            if (node.parentElement && (
              node.parentElement.closest('#audit-scan-overlay') ||
              node.parentElement.closest('#audit-trust-badge') ||
              node.parentElement.closest('.audit-highlight') ||
              node.parentElement.closest('.audit-tooltip-box')
            )) {
              return NodeFilter.FILTER_REJECT;
            }
            if (node.textContent.includes(claim.text)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );

      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      // Only highlight first occurrence
      if (textNodes.length > 0) {
        const textNode = textNodes[0];
        const text = textNode.textContent;
        const index = text.indexOf(claim.text);

        if (index === -1) return;

        const before = text.substring(0, index);
        const match = text.substring(index, index + claim.text.length);
        const after = text.substring(index + claim.text.length);

        const span = document.createElement('span');
        span.className = `audit-highlight audit-${claim.status}`;
        span.textContent = match;
        span.dataset.claimId = claim.id;
        span.dataset.status = claim.status;
        span.dataset.confidence = claim.confidence;
        span.dataset.explanation = claim.explanation || '';

        const parent = textNode.parentNode;
        const frag = document.createDocumentFragment();

        if (before) frag.appendChild(document.createTextNode(before));
        frag.appendChild(span);
        if (after) frag.appendChild(document.createTextNode(after));

        parent.replaceChild(frag, textNode);
      }
    });
  }

  // ══════════════════════════════════════════════════════
  // STEP 5 — TOOLTIPS
  // ══════════════════════════════════════════════════════

  function setupTooltips() {
    let currentTooltip = null;

    document.addEventListener('mouseover', (e) => {
      const highlight = e.target.closest('.audit-highlight');
      if (!highlight) return;

      // Remove existing tooltip
      if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
      }

      const status = highlight.dataset.status;
      const confidence = highlight.dataset.confidence;
      const explanation = highlight.dataset.explanation;

      const tooltip = document.createElement('div');
      tooltip.className = 'audit-tooltip-box';

      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
      const statusClass = `audit-tooltip-status--${status}`;

      tooltip.innerHTML = `
        <div class="audit-tooltip-header">
          <span class="audit-tooltip-status ${statusClass}">${statusLabel}</span>
          <span class="audit-tooltip-confidence">Confidence: ${confidence}%</span>
        </div>
        ${explanation ? `<p class="audit-tooltip-explanation">${explanation}</p>` : ''}
      `;

      document.body.appendChild(tooltip);
      currentTooltip = tooltip;

      // Position tooltip
      const rect = highlight.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let top = rect.top - tooltipRect.height - 10 + window.scrollY;
      let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + window.scrollX;

      // Keep it on screen
      if (top < window.scrollY) {
        top = rect.bottom + 10 + window.scrollY;
      }
      if (left < 8) left = 8;
      if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });

    document.addEventListener('mouseout', (e) => {
      const highlight = e.target.closest('.audit-highlight');
      if (highlight && currentTooltip) {
        currentTooltip.style.opacity = '0';
        currentTooltip.style.transform = 'translateY(4px)';
        const tt = currentTooltip;
        setTimeout(() => tt.remove(), 200);
        currentTooltip = null;
      }
    });
  }

  // ══════════════════════════════════════════════════════
  // BONUS — FLOATING TRUST BADGE
  // ══════════════════════════════════════════════════════

  function showTrustBadge(summary) {
    // Remove existing
    const existing = document.getElementById('audit-trust-badge');
    if (existing) existing.remove();

    const score = summary.trustScore || 0;
    const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

    const badge = document.createElement('div');
    badge.id = 'audit-trust-badge';
    badge.className = 'audit-trust-badge';
    badge.innerHTML = `
      <div class="audit-badge-score" style="--badge-color: ${color}">
        <span class="audit-badge-number">${score}</span>
        <span class="audit-badge-label">Trust</span>
      </div>
      <div class="audit-badge-stats">
        <span class="audit-badge-stat audit-badge-stat--verified">✓ ${summary.verified || 0}</span>
        <span class="audit-badge-stat audit-badge-stat--unverified">? ${summary.unverified || 0}</span>
        <span class="audit-badge-stat audit-badge-stat--hallucinated">✕ ${summary.hallucinated || 0}</span>
      </div>
    `;

    document.body.appendChild(badge);

    // Animate in
    requestAnimationFrame(() => {
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    });
  }

  // ══════════════════════════════════════════════════════
  // BONUS — "SCAN COMPLETE" FLASH
  // ══════════════════════════════════════════════════════

  function showScanComplete() {
    const flash = document.createElement('div');
    flash.className = 'audit-scan-complete';
    flash.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Scan Complete
    `;

    document.body.appendChild(flash);

    requestAnimationFrame(() => {
      flash.style.opacity = '1';
      flash.style.transform = 'translate(-50%, 0)';
    });

    setTimeout(() => {
      flash.style.opacity = '0';
      flash.style.transform = 'translate(-50%, -10px)';
      setTimeout(() => flash.remove(), 400);
    }, 2000);
  }

  // ══════════════════════════════════════════════════════
  // MAIN FLOW
  // ══════════════════════════════════════════════════════

  async function runAnalysis() {
    // 1. Show scanning animation
    showScanOverlay();

    // 2. Detect content type and extract
    const content = extractContent();

    // 3. Simulate backend call (2 seconds)
    const data = await simulateAnalysis(content);

    // 4. Remove overlay with fade
    removeScanOverlay();

    // Brief pause for the overlay fade
    await new Promise((r) => setTimeout(r, 500));

    // 5. Highlight claims in page
    highlightClaims(data);

    // 6. Setup tooltips
    setupTooltips();

    // 7. Show trust badge
    if (data.summary) {
      showTrustBadge(data.summary);
    }

    // 8. Flash "Scan Complete"
    showScanComplete();
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'analyze') {
      // Clean up previous analysis
      cleanup();
      runAnalysis();
      sendResponse({ status: 'started' });
    }
    return true;
  });

  function cleanup() {
    window.__auditTrailInitialized = false;

    // Remove highlights
    document.querySelectorAll('.audit-highlight').forEach((el) => {
      const text = el.textContent;
      el.replaceWith(document.createTextNode(text));
    });

    // Remove badge
    const badge = document.getElementById('audit-trust-badge');
    if (badge) badge.remove();

    // Remove overlay
    removeScanOverlay();

    // Remove tooltips
    document.querySelectorAll('.audit-tooltip-box').forEach((el) => el.remove());

    // Remove flash
    document.querySelectorAll('.audit-scan-complete').forEach((el) => el.remove());

    window.__auditTrailInitialized = true;
  }
})();
