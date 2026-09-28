const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const Personnel = require('./models/Personnel');
const bcrypt = require('bcryptjs');

async function setupEkta() {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    let p = await Personnel.findOne({ name: /ekta/i });
    if (!p) {
      p = await Personnel.create({ name: 'Ekta', duties: 'Accounts', capacity: 48, status: 'active' });
      console.log('Created Personnel record for Ekta');
    } else {
      p.duties = 'Accounts';
      await p.save();
      console.log('Updated Personnel record for Ekta');
    }

    let u = await User.findOne({
      $or: [
        { email: 'ekta@ci360.local' },
        { name: /ekta/i }
      ]
    });

    const hash = await bcrypt.hash('Employee123!', 10);

    if (!u) {
      u = await User.create({
        name: 'Ekta',
        email: 'ekta@ci360.local',
        passwordHash: hash,
        role: 'accounts',
        personnelId: p._id,
        active: true
      });
      console.log('Created User Ekta with role accounts');
    } else {
      u.role = 'accounts';
      u.personnelId = p._id;
      u.active = true;
      u.passwordHash = hash;
      await u.save();
      console.log('Updated User Ekta to role accounts:', u.email);
    }

    console.log('--- Ekta Account Ready ---');
    console.log('Name: ' + u.name);
    console.log('Username: ekta');
    console.log('Email: ' + u.email);
    console.log('Password: Employee123!');
    console.log('Role: ' + u.role);

    process.exit(0);
  } catch (err) {
    console.error('Error setting up Ekta:', err);
    process.exit(1);
  }
}

setupEkta();
