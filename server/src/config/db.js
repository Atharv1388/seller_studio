import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }
  try {
    const options = {};
    // Prefer explicit DB name from env if provided; otherwise let Mongoose use the DB in the URI
    if (process.env.MONGODB_DB_NAME) {
      options.dbName = process.env.MONGODB_DB_NAME;
    }
    await mongoose.connect(uri, options);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
