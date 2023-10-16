import productModel from '../models/productModel.js';
import Crud from '../utils/crudFactory.js';

export const getAllProducts = new Crud(productModel).getAll();
export const getOneProduct = new Crud(productModel).getOne();
export const createNewProduct = new Crud(productModel).createOne();
export const updateOneProduct = new Crud(productModel).updateOne();
export const deleteProduct = new Crud(productModel).deleteOne();
