const { MongoClient, ObjectId } = require('mongodb');

let client;
let database;

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');

        // Connect to the specific database
        database = client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process on error
    }
}

async function disconnectFromDatabase() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
}

async function addDownloadLink(messageId, downloadLink) {
    const downloadLinksCollection = database.collection('downloadLinks');

    try {
        await downloadLinksCollection.insertOne({
            _id: new ObjectId(),
            messageId,
            downloadLink,
        });
        console.log('Download link added to MongoDB');
    } catch (error) {
        console.error('Error adding download link to MongoDB:', error);
    }
}

async function getDownloadLink(messageId) {
    const downloadLinksCollection = database.collection('downloadLinks');

    try {
        const link = await downloadLinksCollection.findOne({ messageId });
        return link ? link.downloadLink : null;
    } catch (error) {
        console.error('Error retrieving download link from MongoDB:', error);
        return null;
    }
}

// Similar functions for watch links can be implemented if needed

module.exports = {
    connectToDatabase,
    disconnectFromDatabase,
    addDownloadLink,
    getDownloadLink,
};
