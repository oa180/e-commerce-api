import userModel from '../models/userModel.js';
import Crud from '../utils/crudFactory.js';

export const getAllUsers = new Crud(userModel).getAll();
export const getOneUser = new Crud(userModel).getOne();
export const createNewUser = new Crud(userModel).createOne();
export const updateOneUser = new Crud(userModel).updateOne();
export const deleteUser = new Crud(userModel).deleteOne();
