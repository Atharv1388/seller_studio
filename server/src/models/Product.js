import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    detail: { type: String, trim: true },
    image: { type: String, trim: true }, // URL or path
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    brands: { type: [brandSchema], validate: v => Array.isArray(v) && v.length > 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
