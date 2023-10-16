// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

/*
generator client {
    provider = "prisma-client-js"
}
  
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}
  
  
  
  model Comment {
    date      DateTime
    content   String
    author    User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId    Int
    post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    postId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  
    @@id([userId, postId])
  }
  
  model Like {
    date      DateTime
    author    User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId    Int
    post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    postId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  
    @@id([userId, postId])
  }
  
  model FavList {
    author    User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId    Int
    post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    postId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  
    @@id([userId, postId])
  }
  
  model Order {
    date      DateTime
    payement  String   @default("CASH")
    price     Float
    author    User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId    Int
    post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    postId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  
    @@id([userId, postId])
  }
  
  model Category {
    id      Int    @id @default(autoincrement())
    name    String
    Product Post[]
  }

  */

/**
   * 
  model User {
    id       Int       @id @unique @default(autoincrement())
    fname    String
    lname    String
    email    String    @unique
    password String
    phone    String
    dob      DateTime
    role     String    @default("user")
    gender   String    @default("none")
    posts    Post[]
    comments Comment[]
    likes    Like[]
    favList  FavList[]
    orders   Order[]
  
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  
   */
import mongoose from 'mongoose';
import validator from 'validator';
import argon from 'argon2';
import crypto from 'crypto';

import {
  ValidatePhoneNumber,
  ValidatePassword,
} from '../utils/customValidators.js';

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, 'User  must  have a first name!'],
    },
    lname: {
      type: String,
      required: [true, 'User  must  have a last name!'],
    },
    email: {
      type: String,
      required: [true, 'User must have an email!'],
      unique: [true, 'Email must be unique!'],
      validate: [validator.isEmail, 'Please enter a valid email!'],
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'User must have a Phone Number!'],
      validate: {
        validator: function () {
          return new ValidatePhoneNumber().validate(this.phone);
        },
        message: 'Invalid Phone Number',
      },
    },
    dob: {
      type: String,
      required: [true, 'User must have a date of birth!'],
      // validate: [validator.isDate, 'Please provide a valid date!'],
    },
    gender: {
      type: String,
      required: [true, 'User must specify a gender!'],
      enum: {
        values: ['male', 'female'],
        message: "Gender must me 'male' or 'female'!",
      },
    },
    address: {
      type: String,
      required: [true, 'User must enter an address!'],
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
      min: [8, 'Password must be at least 8 characters!'],
      validate: {
        validator: function () {
          return new ValidatePassword().validate(this.password);
        },
        message:
          'Password must be at least one Uppercase, one Number, and one Special Character!',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user', 'seller'],
        message: 'Wrong Role',
      },
      default: 'user',
    },
    cart: { type: mongoose.Schema.ObjectId, ref: 'Cart' },
    loggedIn: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: { type: Date, default: Date.now() },
    resetPasswordToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Calculate User Age at run time
userSchema.virtual('age').get(function () {
  let cuurentYear = new Date();
  cuurentYear = cuurentYear.getFullYear();

  let userBirthYear = new Date(this.dob);
  userBirthYear = userBirthYear.getFullYear();

  return cuurentYear - userBirthYear;
});

// Hashing Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await argon.hash(this.password);
  next();
});

// Updating Password Changed At Field
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check Users provides password
userSchema.methods.validatePassword = async function (userPassword) {
  return await argon.verify(this.password, userPassword);
};

// Check User's password changetAt
userSchema.methods.changedPasswordAfterTokenInitiated = function (
  tokenInitiatedDate,
) {
  return Date.parse(this.passwordChangedAt) / 1000 < tokenInitiatedDate;
};

// Generate Password Reset Token
userSchema.methods.createResetPasswordToken = function () {
  // Create rondom string to be random token
  const randomToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(randomToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return randomToken;
};

export default mongoose.model('User', userSchema);
