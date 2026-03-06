import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

const log = (msg) => {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('debug_log.txt', logMsg);
    console.log(msg);
};

fs.writeFileSync('debug_log.txt', 'Starting debug script v2...\n');

dotenv.config();

// Hardcoded URI based on successful DNS resolution
const uri = 'mongodb://admin:admin@cluster0-shard-00-00.0unhjyk.mongodb.net:27017,cluster0-shard-00-01.0unhjyk.mongodb.net:27017,cluster0-shard-00-02.0unhjyk.mongodb.net:27017/product_management_system?ssl=true&replicaSet=atlas-13542e-shard-0&authSource=admin&retryWrites=true&w=majority';

log(`URI: ${uri.replace(/:([^:@]{1,})@/, ':****@')}`);

const connectDB = async () => {
    try {
        log('Attempting to connect to MongoDB with 10s timeout...');

        // Add timeout to connection options
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        log(`MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        log(`Error Name: ${error.name}`);
        log(`Error Message: ${error.message}`);
        if (error.reason) log(`Error Reason: ${JSON.stringify(error.reason)}`);
        process.exit(1);
    }
};

connectDB();

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit(1);
});
