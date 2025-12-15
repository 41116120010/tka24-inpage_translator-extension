<<<<<<< HEAD
# TKA24 Translator Extension
=======
# TKA24 Translator - Dev Mode Extension
>>>>>>> 357ced6 (Upload from Ubuntu)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green.svg)
![Groq](https://img.shields.io/badge/Powered%20By-Groq%20Cloud-orange.svg)

A powerful, developer-focused Chrome Extension that translates selected text into Indonesian using a **"Programmer Mode"** persona. Built with standard web technologies and powered by the ultra-fast Groq Cloud API.

## ✨ Features

- **⚡ Instant Translation**: Highlights text and click the lightning bolt icon.
- **💻 Dev Mode Persona**: Translations are direct, technical, and use analogies suitable for developers (English -> Indonesian).
- **🏎️ Groq Cloud Integration**: Uses the `llama-3.3-70b-versatile` model for high-speed, intelligent responses.
- **🌗 Light / Dark Mode**: Toggles seamlessly to match your preference.
- **📌 Fixed Sidebar UI**: Results appear in a persistent, scrollable sidebar on the right, keeping your reading flow uninterrupted.
- **🛡️ SPA & Iframe Support**: Works reliably on modern React/Vue sites (like NetAcad) and within embedded frames.

## 🛠️ Installation

This extension is currently in **Developer Mode** and not on the Chrome Web Store.

1.  Clone or Download this repository to your local machine.
    ```bash
<<<<<<< HEAD
    git clone https://github.com/41116120010/tka24-inpage_translator-extension.git
=======
    git clone https://github.com/yourusername/TKA24_Translator.git
>>>>>>> 357ced6 (Upload from Ubuntu)
    # Or just unzip the provided folder
    ```
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** using the toggle switch in the top-right corner.
4.  Click the **Load unpacked** button.
5.  Select the folder where you saved this project (`TKA24_Translator`).

## ⚙️ Configuration (API Key)

To use the translation feature, you need a free API Key from Groq.

1.  **Get API Key**:

    - Visit [console.groq.com](https://console.groq.com/keys).
    - Sign up/Login and create a new API Key.
    - Copy the key (starts with `gsk_...`).

2.  **Configure Extension**:
    - Click the **TKA24 Extension Icon** in your Chrome Toolbar (you may need to click the Puzzle piece icon to find it).
    - In the popup menu, paste your key into the **Groq Cloud API Key** field.
    - (Optional) specific domains to the **Blacklist** (one per line) if you want to disable the extension there (e.g., `localhost`).
    - Click **Save Settings**.
    - _Tip: Use the Moon/Sun icon in the popup to switch themes!_

## 📖 Usage

1.  Browse any website.
2.  **Select/Highlight** any text you want to translate.
3.  A small **⚡ (Lightning)** button will appear above your selection.
4.  Click the button.
5.  The translation will appear in a sidebar on the right.
6.  The result stays open until you click the **X** button or translate a new sentence.

## 🏗️ Tech Stack

- **Frontend**: HTML5, CSS3 (Variables for theming), Vanilla JavaScript.
- **API**: [Groq Cloud](https://groq.com/) (Model: `llama-3.3-70b-versatile`).
- **Architecture**: Chrome Manifest V3.

## 📝 Troubleshooting

- **Button doesn't appear?**
  - Refresh the page. Extensions only work on pages loaded _after_ installation.
  - The extension cannot run on `chrome://` system pages or the Web Store.
- **"Error: API Request Failed"?**
  - Check your internet connection.
  - Verify your API Key in the extension popup.
  - Check if the Groq model is currently online.
<<<<<<< HEAD
=======

---

_Created for TKA24 Project._
>>>>>>> 357ced6 (Upload from Ubuntu)
