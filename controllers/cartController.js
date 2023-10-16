import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import Crud from '../utils/crudFactory.js';
import Response from '../utils/response.js';

export const createCart = new Crud(Cart).createOne();

export const addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart);
  const oldProducts = cart.products;
  const newProducts = [...oldProducts];

  if (oldProducts.length == 0) {
    newProducts.push({ pid: req.body.productId, count: 1 });
  }

  oldProducts.forEach((product, index) => {
    console.log(oldProducts.length);
    if (product.pid == req.body.productId) {
      product.count++;
    }

    if (product.pid != req.body.productId && index == oldProducts.length - 1) {
      newProducts.push({ pid: req.body.productId, count: 1 });
    }
  });

  cart.products = newProducts;
  await cart.save({ validateBeforeSave: true });

  Response(res, 'Added To Cart', 200, cart);
});
export const deleteCart = new Crud(Cart).deleteOne();
export const getCart = new Crud(Cart).getOne();
