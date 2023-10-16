// Out Packages Imports
import express from 'express';

// Local Imports
import {
  createCart,
  addToCart,
  deleteCart,
  getCart,
} from '../controllers/cartController.js';

import { authenticate } from '../controllers/authController.js';
// Router App
const router = express.Router();

// SEC Cart Endpoints

// Get One Cart
router.get('/:id', getCart);

// Create New Cart
router.post('/', createCart);

// Update Cart
router.patch('/add-cart-item', authenticate, addToCart);

// Delete Cart
router.delete('/:id', deleteCart);

// Router Expors
export default router;
