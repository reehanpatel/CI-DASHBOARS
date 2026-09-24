// CI360 Root Entry Point
const path = require('path');
const dotenv = require('dotenv');

// Load root .env and backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, 'backend/.env') });

// Run the Express backend server
require('./backend/server.js');
