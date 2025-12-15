// TKA24 Translator Background Script

// Constants
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// Listen for messages/events
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // 1. Handle "translate" action
    if (request.action === 'translate') {
        handleTranslation(request.text).then(sendResponse);
        return true; // Keep message channel open for async response
    }

    // 2. Handle "openOptions" action
    if (request.action === 'openOptions') {
        chrome.runtime.openOptionsPage();
    }
});

async function handleTranslation(text) {
    // Get API Key
    const settings = await chrome.storage.local.get(['apiKey']);
    if (!settings.apiKey) {
        return { error: 'API Key not configured.' };
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.apiKey}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: "You are a translator. Translate the following English text to Indonesian. The tone should be 'Programmer Mode' (direct, technical, using analogies if necessary). Only return the translated text, no conversational filler."
                    },
                    {
                        role: "user",
                        content: text
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Request Failed: ${response.status} ${errorData.error?.message || ''}`);
        }

        const data = await response.json();
        const translation = data.choices[0]?.message?.content || "No translation returned.";
        
        return { translation: translation };

    } catch (error) {
        console.error('Translation Error:', error);
        return { error: error.message };
    }
}
