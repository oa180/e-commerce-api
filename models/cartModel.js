import mongoose from 'mongoose';

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    belongTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Cart must have an owner!'],
    },
    products: [
      {
        pid: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        count: { type: Number, default: 1 },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0,
      min: [0, 'Invalid Cart Total!'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model('Cart', cartSchema);
