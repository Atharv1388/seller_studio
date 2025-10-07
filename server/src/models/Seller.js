import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    password: { type: String, required: true },
    role: { type: String, enum: ['seller'], default: 'seller' }
  },
  { timestamps: true }
);

export default mongoose.model('Seller', sellerSchema);
