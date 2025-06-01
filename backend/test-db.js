// backend/test-db.js
require('dotenv').config();
const connectDB = require('./config/database');
const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🌍 Testing BUMIVERSE MongoDB Atlas connection...\n');
  
  // Check environment variables
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('💡 Make sure you have .env file with MONGODB_URI');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded');
  console.log(`🌱 BUMIVERSE connecting to: ${process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  
  try {
    // Test connection
    const connection = await connectDB();
    
    if (connection) {
      console.log('\n🎉 BUMIVERSE database connection SUCCESSFUL!');
      
      // Test basic database operations
      console.log('\n📊 Testing BUMIVERSE database operations...');
      
      // Create a test collection
      const testCollection = mongoose.connection.db.collection('bumiverse_connection_test');
      
      // Insert test document
      const testDoc = {
        app: 'BUMIVERSE',
        test: true,
        timestamp: new Date(),
        message: 'BUMIVERSE database ready to save the planet! 🌍'
      };
      
      await testCollection.insertOne(testDoc);
      console.log('✅ BUMIVERSE test document inserted');
      
      // Read test document
      const foundDoc = await testCollection.findOne({ app: 'BUMIVERSE' });
      console.log('✅ BUMIVERSE test document retrieved:', foundDoc?.message);
      
      // Clean up test document
      await testCollection.deleteOne({ app: 'BUMIVERSE' });
      console.log('✅ BUMIVERSE test document cleaned up');
      
      console.log('\n🌟 All BUMIVERSE database tests passed! Ready to build a greener world! 🌱');
      
    } else {
      console.log('❌ BUMIVERSE connection failed');
    }
    
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check your username and password in MONGODB_URI');
      console.log('2. Make sure the database user exists in MongoDB Atlas');
      console.log('3. Verify the password is correct (no special characters issues)');
    }
    
    if (error.message.includes('connect ECONNREFUSED') || error.message.includes('timed out')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check your internet connection');
      console.log('2. Verify IP address is whitelisted in MongoDB Atlas');
      console.log('3. Check if firewall is blocking the connection');
    }
  } finally {
    // Close connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('\n🔌 Connection closed');
    }
    process.exit(0);
  }
};

testConnection();