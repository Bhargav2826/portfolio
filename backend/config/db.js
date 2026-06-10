const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('bufferCommands', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Do not exit process, let the server run with limited functionality
    }
};

module.exports = connectDB;
