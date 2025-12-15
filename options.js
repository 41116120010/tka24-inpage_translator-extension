// Saves options to chrome.storage
const saveOptions = () => {
  const apiKey = document.getElementById("apiKey").value;
  const blacklist = document.getElementById("blacklist").value;

  chrome.storage.local.set({ apiKey: apiKey, blacklist: blacklist }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Settings Saved successfully!";
    status.style.opacity = "1";

    setTimeout(() => {
      status.style.opacity = "0";
    }, 2000);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get({ apiKey: "", blacklist: "localhost" }, (items) => {
    document.getElementById("apiKey").value = items.apiKey;
    document.getElementById("blacklist").value = items.blacklist;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
