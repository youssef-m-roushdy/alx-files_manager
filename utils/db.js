import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        
        this.url = `mongodb://${host}:${port}`;
        this.database = database;
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        this.isConnected = false;
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.isConnected = true;
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            this.isConnected = false;
            throw error;  // Re-throw the error to be handled outside
        }
    }

    isAlive() {
        return this.isConnected;
    }

    async nbUsers() {
        return this.getCount('users');
    }

    async nbFiles() {
        return this.getCount('files');
    }

    async getCount(collectionName) {
        if (!this.isAlive()) {
            console.error('Database not connected');
            return 0;
        }

        const db = this.client.db(this.database);
        const collection = db.collection(collectionName);
        try {
            const count = await collection.countDocuments();
            return count;
        } catch (error) {
            console.error(`Error counting documents in ${collectionName}:`, error);
            return 0;  // Return 0 on error
        }
    }

    async close() {
        if (this.isConnected) {
            await this.client.close();
            this.isConnected = false;
            console.log('MongoDB connection closed');
        }
    }
}

const dBClient = new DBClient();

export default dBClient;
