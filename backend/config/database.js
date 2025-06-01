// backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection options (updated for latest driver)
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maximum number of connections
      retryWrites: true,
      w: 'majority'
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`🌍 BUMIVERSE MongoDB Connected: ${conn.connection.host}`);
    console.log(`🌱 Database: ${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ BUMIVERSE connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ BUMIVERSE connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ BUMIVERSE disconnected from MongoDB');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔴 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

    return conn;

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log('🔄 Retrying database connection...');
      connectDB();
    }, 5000);
    
    // Don't exit process, let it retry
    return null;
  }
};

module.exports = connectDB;