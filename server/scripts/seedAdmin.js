import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Admin from '../src/models/Admin.js';
import { hashPassword } from '../src/middleware/auth.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'Admin@123';
    const name = process.argv[4] || 'Super Admin';

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }
    const hashed = await hashPassword(password);
    await Admin.create({ name, email, password: hashed });
    console.log('Admin created:', email);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

run();
