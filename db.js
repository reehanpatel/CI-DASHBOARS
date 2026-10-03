// Hostinger Database Connector & Bridge for CI360
const { MongoClient } = require('mongodb');
const connectDB = require('./backend/config/db');

module.exports = {
  MongoClient,
  connectDB
};
