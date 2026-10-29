require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function migrateAdmins() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to DB');

    // Designated 2 Superadmin emails
    const superEmails = ['superadmin@ci360.local', 'admin@ci360.local'];

    // 1. Ensure the 2 dedicated superadmins have role = 'superadmin'
    for (const em of superEmails) {
      const u = await User.findOne({ email: em.toLowerCase() });
      if (u) {
        u.role = 'superadmin';
        await u.save();
        console.log(`Verified Superadmin: ${u.name} (${u.email}) -> role: superadmin`);
      }
    }

    // 2. Target specific users: Aashit, Urna, Pramit, Mansi
    const targetNames = ['Aashit', 'Urna', 'Pramit', 'Mansi'];
    for (const name of targetNames) {
      const users = await User.find({
        $or: [
          { name: new RegExp('^' + name + '$', 'i') },
          { email: new RegExp('^' + name.toLowerCase() + '@', 'i') }
        ]
      });

      for (const u of users) {
        u.role = 'admin';
        await u.save();
        console.log(`Updated to Admin: ${u.name} (${u.email}) -> role: admin`);
      }
    }

    // 3. For any other user having role 'superadmin' who is NOT in superEmails, change to 'admin'
    const others = await User.find({
      role: 'superadmin',
      email: { $nin: superEmails }
    });

    for (const u of others) {
      u.role = 'admin';
      await u.save();
      console.log(`Converted extra superadmin to Admin: ${u.name} (${u.email}) -> role: admin`);
    }

    // Summary of current superadmins and admins
    const currentSupers = await User.find({ role: 'superadmin', isDeleted: { $ne: true } });
    const currentAdmins = await User.find({ role: 'admin', isDeleted: { $ne: true } });

    console.log('\n======================================');
    console.log(`Current Superadmins (Count: ${currentSupers.length}):`);
    currentSupers.forEach(s => console.log(` - ${s.name} (${s.email})`));

    console.log(`\nCurrent Admins (Count: ${currentAdmins.length}):`);
    currentAdmins.forEach(a => console.log(` - ${a.name} (${a.email})`));
    console.log('======================================\n');

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateAdmins();
