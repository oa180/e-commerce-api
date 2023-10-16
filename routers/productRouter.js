// Out Packages Imports
import express from 'express';

// Local Imports
import {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate } from '../controllers/authController.js';

// Router App
const router = express.Router();

// SEC Product Endpoints

// Get ALl Products
router.get('/', getAllProducts);

// Get One Product
router.get('/:id', authenticate, getOneProduct);

// Create New Product
router.post('/', createNewProduct);

// Update Product
router.patch('/:id', updateOneProduct);

// Delete Product
router.delete('/:id', deleteProduct);

// Router Expors
export default router;
