// Popup Logic

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load Settings
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(
        { apiKey: '', blacklist: 'localhost', theme: 'dark' },
        (items) => {
            document.getElementById('apiKey').value = items.apiKey;
            document.getElementById('blacklist').value = items.blacklist;
            applyTheme(items.theme);
        }
    );
});

// Save Settings
document.getElementById('save').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    const blacklist = document.getElementById('blacklist').value;
    // Theme is saved immediately on toggle, but we can resave it here just in case? 
    // Actually, save button usually implies form data. Theme is instant.
    
    chrome.storage.local.set(
        { apiKey: apiKey, blacklist: blacklist },
        () => {
            const status = document.getElementById('status');
            status.style.opacity = '1';
            setTimeout(() => { status.style.opacity = '0'; }, 2000);
        }
    );
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    chrome.storage.local.set({ theme: currentTheme });
});

function applyTheme(theme) {
    if (theme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme'); // default is dark
        themeToggle.textContent = '🌙';
    }
}
