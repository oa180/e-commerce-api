// Out Packages Imports
import express from 'express';

// Local Imports
import {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// SEC User Endpoints

// Get ALl Users
router.get('/', getAllUsers);

// Get One User
router.get('/:id', getOneUser);

// Create New User
router.post('/', createNewUser);

// Update User
router.patch('/:id', updateOneUser);

// Delete User
router.delete('/:id', deleteUser);

export default router;
