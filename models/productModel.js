// model Post {
//     id            Int      @id @default(autoincrement())
//     contactMethod String
//     author        User     @relation(fields: [userId], references: [id], onDelete: Restrict, onUpdate: Cascade)
//     userId        Int
//     pname         String
//     category      Category @relation(fields: [categoryId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//     categoryId    Int

//     images      String[]
//     delivery    Boolean
//     description String?
//     price       Float
//     comments    Comment[]
//     likes       Like[]
//     favList     FavList[]
//     orders      Order[]
//     createdAt   DateTime  @default(now())
//     updatedAt   DateTime  @updatedAt
//   }

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: {
        values: [
          'accessories',
          'fashion',
          'groceries',
          'home-decoration',
          'skincare',
          'fragrances',
          'laptops',
          'smartphones',
        ],
        message: 'Please select a product category.',
      },
    },

    productOwner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Product must have an owner!'],
    },
    thumbnail: String,
    images: [String],

    price: { type: Number, required: true },
    rating: {
      type: Number,
      min: [1, 'Rating must be greate than one!'],
      max: [5, 'Rating must be less than five!'],
    },
    stock: {
      type: Number,
      required: [true, 'Product must have stock number!'],
    },
    brand: String,
    discountPercentage: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model('Product', productSchema);
