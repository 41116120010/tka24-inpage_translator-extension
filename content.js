// TKA24 Translator Content Script

let currentFab = null;
let currentBubble = null;
let selectionDebounce = null;

// Helper to remove any existing FAB
function removeFab() {
    if (currentFab) {
        currentFab.remove();
        currentFab = null;
    }
}

// Helper to remove any existing Bubble
function removeBubble() {
    if (currentBubble) {
        currentBubble.remove();
        currentBubble = null;
    }
}

// --- Main Event Handler: selectionchange ---
// This works even if sites block 'mouseup', and handles keyboard selection too.
document.addEventListener('selectionchange', () => {
    // 1. Debounce (wait for selection to settle)
    if (selectionDebounce) clearTimeout(selectionDebounce);
    
    selectionDebounce = setTimeout(async () => {
        handleSelectionChange();
    }, 600); // 600ms delay to ensure user stopped dragging/selecting
});

async function handleSelectionChange() {
    let text = "";
    let rect = null;
    let isInput = false;

    const selection = window.getSelection();
    const activeEl = document.activeElement;

    // 1. Check INPUT/TEXTAREA first (activeElement)
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        const start = activeEl.selectionStart;
        const end = activeEl.selectionEnd;
        if (start !== end) {
            text = activeEl.value.substring(start, end).trim();
            rect = activeEl.getBoundingClientRect(); // Use input box as anchor
            isInput = true;
        }
    } 
    // 2. Standard Selection
    else if (!selection.isCollapsed) {
        text = selection.toString().trim();
        if (text && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            rect = range.getBoundingClientRect();
        }
    }

    // --- Validation & Cleanup ---
    if (!text) {
        // If selection is gone, remove FAB.
        // But do NOT remove Result Bubble (Requirement: Persist until closed)
        removeFab();
        return;
    }

    // Avoid reacting if the user is interacting with OUR UI elements
    // (Though selectionchange won't fire for clicking buttons usually, unless text inside is selected)
    // We can check if the selection anchorNode is inside our fab/bubble
    if (selection.anchorNode) {
        const parent = selection.anchorNode.parentElement;
        if (parent && (parent.closest('.tka24-translator-container'))) {
            return;
        }
    }

    // --- Domain Blacklist Check ---
    const settings = await chrome.storage.local.get(['apiKey', 'blacklist']);
    const hostname = window.location.hostname; 
    if (settings.blacklist) {
        const blacklistArr = settings.blacklist.split('\n').map(s => s.trim());
        if (blacklistArr.includes(hostname)) {
            return; 
        }
    }

    // --- Calculate Position ---
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Default position: above the center of the selection
    // isInput uses the whole input box rect, standard uses the text range rect
    const top = rect.top + scrollY - 45; 
    const left = rect.left + scrollX + (rect.width / 2) - 16; 

    // Remove old FAB before showing new one
    removeFab();

    // --- Inject FAB ---
    currentFab = document.createElement('div');
    currentFab.className = 'tka24-translator-container tka24-fab';
    currentFab.innerHTML = '⚡';
    currentFab.style.top = `${top}px`;
    currentFab.style.left = `${left}px`;
    
    // Prevent FAB from stealing focus or altering selection when clicked
    currentFab.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Critical to keep selection
        e.stopPropagation();
    });

    // Handle Click
    currentFab.addEventListener('click', async (e) => {
        e.stopPropagation();

        if (!settings.apiKey) {
            // Show a mini-alert or console log. Opening popup grammatically needs user gesture on background, 
            // but we are in content script. Best we can do is alert.
            alert('TKA24: Please set your API Key in the extension popup.');
            return;
        }

        currentFab.innerHTML = '';
        currentFab.classList.add('loading');

        try {
            const response = await chrome.runtime.sendMessage({
                action: "translate",
                text: text
            });

            const themeSettings = await chrome.storage.local.get(['theme']);
            const isLight = themeSettings.theme === 'light';

            if (response.error) {
                showResult(`Error: ${response.error}`, isLight);
            } else {
                showResult(response.translation, isLight);
            }
        } catch (err) {
            showResult(`Error: ${err.message}`, false);
        }
    });

    document.body.appendChild(currentFab);
}

function showResult(content, isLight) {
    removeFab(); // Remove button
    removeBubble(); // Replace old bubble

    currentBubble = document.createElement('div');
    currentBubble.className = 'tka24-translator-container tka24-result-bubble';
    
    if (isLight) {
        currentBubble.classList.add('tka24-light-mode');
    }
    
    const htmlContent = `
        <button class="tka24-close-btn">&times;</button>
        <h5>Translated (Dev Mode)</h5>
        <div class="tka24-result-content"></div>
    `;
    currentBubble.innerHTML = htmlContent;
    currentBubble.querySelector('.tka24-result-content').textContent = content;
    
    // Prevent interactions with bubble from triggering selectionchange weirdness?
    currentBubble.addEventListener('mousedown', (e) => e.stopPropagation());
    currentBubble.addEventListener('mouseup', (e) => e.stopPropagation());

    document.body.appendChild(currentBubble);

    // Close Handler
    currentBubble.querySelector('.tka24-close-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeBubble();
    });
}
