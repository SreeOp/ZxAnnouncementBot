const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, 'data', 'database.json');

function readDatabase() {
    if (!fs.existsSync(databasePath)) {
        fs.writeFileSync(databasePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
}

function writeDatabase(data) {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

function addDownloadLink(messageId, downloadLink) {
    const db = readDatabase();
    db[messageId] = downloadLink;
    writeDatabase(db);
}

function getDownloadLink(messageId) {
    const db = readDatabase();
    return db[messageId];
}

module.exports = {
    addDownloadLink,
    getDownloadLink,
};
