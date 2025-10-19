// seedAdmin.js - create default admin if not exists
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config({ path: '../.env' });  // <-- fixed

async function seed() {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error('MONGO_URI missing in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  const email = 'admin@gururobos.com';
  const password = 'Admin@123';

  let admin = await Admin.findOne({ email });
  if (admin) {
    console.log('✅ Admin already exists');
    process.exit(0);
  }

  admin = new Admin({ name: 'Admin', email, password });
  await admin.save();
  console.log('✅ Admin user created:', email);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
