// Load existing entries when the page loads
document.addEventListener("DOMContentLoaded", loadEntries);

function saveEntry() {
    let text = document.getElementById("journal-entry").value.trim();
    if (text === "") return alert("Please write something before saving.");

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push({ text, date: new Date().toLocaleString() });

    localStorage.setItem("journalEntries", JSON.stringify(entries));
    document.getElementById("journal-entry").value = ""; // Clear input

    loadEntries(); // Reload entries
}

function loadEntries() {
    let entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = ""; // Clear previous entries

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.forEach(entry => {
        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `<strong>${entry.date}</strong><p>${entry.text}</p>`;
        entriesDiv.appendChild(entryDiv);
    });
}

function clearEntries() {
    if (confirm("Are you sure you want to delete all journal entries?")) {
        localStorage.removeItem("journalEntries");
        loadEntries(); // Reload entries
    }
}
