const fs = require('fs');
const path = require('path');

// Ensure the data directory exists
const dataDir = path.join(__dirname);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Path to the database file
const databasePath = path.join(dataDir, 'database.json');

// Function to read the database
function readDatabase() {
    if (!fs.existsSync(databasePath)) {
        fs.writeFileSync(databasePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
}

// Function to write to the database
function writeDatabase(data) {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

// Function to add a download link
function addDownloadLink(messageId, downloadLink) {
    const db = readDatabase();
    if (!db.downloadLinks) db.downloadLinks = {};
    db.downloadLinks[messageId] = downloadLink;
    writeDatabase(db);
}

// Function to get a download link
function getDownloadLink(messageId) {
    const db = readDatabase();
    return db.downloadLinks ? db.downloadLinks[messageId] : null;
}

// Function to add a watch link
function addWatchLink(messageId, watchLink) {
    const db = readDatabase();
    if (!db.watchLinks) db.watchLinks = {};
    db.watchLinks[messageId] = watchLink;
    writeDatabase(db);
}

// Function to get a watch link
function getWatchLink(messageId) {
    const db = readDatabase();
    return db.watchLinks ? db.watchLinks[messageId] : null;
}

module.exports = {
    addDownloadLink,
    getDownloadLink,
    addWatchLink,
    getWatchLink,
};
