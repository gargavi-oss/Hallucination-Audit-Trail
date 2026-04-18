// Popup script — sends message to content script on analyze click

const analyzeBtn = document.getElementById('analyze-btn');

analyzeBtn.addEventListener('click', async () => {
  // Update button state
  analyzeBtn.classList.add('popup__btn--analyzing');
  analyzeBtn.innerHTML = `
    <span class="popup__spinner"></span>
    Scanning...
  `;
  analyzeBtn.disabled = true;

  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
      resetButton('No active tab found');
      return;
    }

    // Send message to content script
    chrome.tabs.sendMessage(tab.id, { action: 'analyze' }, (response) => {
      if (chrome.runtime.lastError) {
        // Content script might not be injected, try injecting it
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['mockData.js', 'content.js']
        }).then(() => {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['styles.css']
          }).then(() => {
            // Retry message after injection
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { action: 'analyze' });
              resetButton('Scan Complete ✅');
            }, 300);
          });
        }).catch(() => {
          resetButton('Cannot analyze this page');
        });
      } else {
        resetButton('Scan Complete ✅');
      }
    });
  } catch (error) {
    resetButton('Error occurred');
  }
});

function resetButton(text) {
  setTimeout(() => {
    analyzeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
      ${text}
    `;
    analyzeBtn.classList.remove('popup__btn--analyzing');
    analyzeBtn.disabled = false;

    // Reset text after 2 seconds
    setTimeout(() => {
      analyzeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        Analyze This Page
      `;
    }, 2000);
  }, 1500);
}
