const mongoose = require('mongoose');

async function connectDB() {
  let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ci360';

  // Sanitize common formatting mistakes in URI string
  uri = uri.trim();
  if (uri.startsWith('mongodb:mongodb+srv://')) {
    uri = uri.replace('mongodb:mongodb+srv://', 'mongodb+srv://');
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ MongoDB connected successfully:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('--------------------------------------------------');
    console.error('Please check your MONGO_URI in backend/.env file:');
    console.error('1. Verify your MongoDB username & password in MONGO_URI.');
    console.error('2. Make sure your IP address (0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access.');
    console.error('3. If using local MongoDB, ensure the service is running on 127.0.0.1:27017.');
    console.error('--------------------------------------------------');
  }
}

module.exports = connectDB;
