import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

// const Tour = require('../../models/tourModel');
// const User = require('../../models/userModel');
// const Review = require('../../models/reviewModel');
import Product from '../models/productModel.js';

dotenv.config({ path: './config.env' });

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log('DB connection successful!'));

// const tours = JSON.parse(
//   fs.readFileSync('./dev-data/data/tours.json', 'utf-8'),
// );
// const reviews = JSON.parse(
//   fs.readFileSync('./dev-data/data/reviews.json', 'utf-8'),
// );
// const users = JSON.parse(
//   fs.readFileSync('./dev-data/data/users.json', 'utf-8'),
// );

const products = JSON.parse(
  fs.readFileSync('./dev-data/data/products-data.json', 'utf-8'),
);

const importData = async () => {
  try {
    // await Tour.create(tours, { validateBeforeSave: false });
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews, { validateBeforeSave: false });
    console.log(products.length);

    await Product.create(products, { validateBeforeSave: false });
    console.log('Data Successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    await Product.deleteMany();
    console.log('Data Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
console.log(process.argv);
