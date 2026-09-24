require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Personnel = require('./models/Personnel');
const Client = require('./models/Client');

async function createAccounts() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing in .env');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to host:', mongoose.connection.host);

    // 1. Dedicated Super Admin Accounts
    const superAccounts = [
      { name: 'Super Admin', email: 'superadmin@ci360.local', pass: 'Admin123!' },
      { name: 'Super Admin', email: 'admin@ci360.local', pass: 'Admin123!' }
    ];

    for (const sa of superAccounts) {
      let superUser = await User.findOne({ email: sa.email });
      if (!superUser) {
        superUser = await User.create({
          name: sa.name,
          email: sa.email,
          passwordHash: await bcrypt.hash(sa.pass, 10),
          role: 'superadmin',
          active: true,
        });
        console.log(`✅ Created Super Admin Account -> ${sa.email} / ${sa.pass}`);
      } else {
        superUser.role = 'superadmin';
        superUser.active = true;
        await superUser.save();
        console.log(`ℹ️ Super Admin Account ready -> ${sa.email}`);
      }
    }

    console.log('\nSuper Admin accounts are ready!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating accounts:', err.message);
    process.exit(1);
  }
}

createAccounts();
