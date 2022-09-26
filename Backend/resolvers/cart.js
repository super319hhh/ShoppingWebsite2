const Cart = require("../models/cart");
const Product = require("../models/product");
const { product, user } = require("./helper");
const User = require("../models/user");

module.exports = {
  addToCart: async (args, req) => {
    try {
      const existedCart = await Cart.findOne({
        creator: args.cartInput.Creator,
        products: args.cartInput.Product,
      });

      if (existedCart) {
        let currentQuantity = existedCart._doc.quantity;
        existedCart.quantity = currentQuantity + 1;

        existedCart.save();

        return {
          _id: existedCart._id,
          creator: user.bind(this, args.cartInput.Creator),
          product: product.bind(this, args.cartInput.Product),
          quantity: existedCart.quantity,
        };
      } else {
        const cart = new Cart({
          creator: args.cartInput.Creator,
          products: args.cartInput.Product,
          quantity: 1,
        });

        const creator = await User.findById(args.cartInput.Creator);

        creator.cart.push(cart);

        creator.save();

        const result = await cart.save();

        return {
          _id: result._id,
          creator: user.bind(this, args.cartInput.Creator),
          product: product.bind(this, args.cartInput.Product),
          quantity: 1,
        };
      }
    } catch (ex) {
      throw ex;
    }
  },
  getCartForUser: async ({ userId }, req) => {
    try {
      if (!req.user) {
        throw "not authorized";
      }

      let carts = await Cart.find({ creator: userId });
      cart = carts.map((item) => {
        return {
          _id: item._id,
          creator: user.bind(this, item.creator),
          product: product.bind(this, item.products),
          quantity: item.quantity,
        };
      });
      return cart;
    } catch (ex) {
      throw ex;
    }
  },
  changeQuantityInCart: async (args, req) => {
    try {
      if (!req.user) {
        throw "not authorized";
      }

      let cart = await Cart.findOne({
        creator: args.changeCartQuantityInput.User,
        products: args.changeCartQuantityInput.Product,
      });

      if (cart) {
        cart.quantity = args.changeCartQuantityInput.Quantity;

        cart.save();

        return {
          _id: cart._id,
          creator: user.bind(this, args.changeCartQuantityInput.User),
          product: product.bind(this, args.changeCartQuantityInput.Product),
          quantity: cart.quantity,
        };
      } else {
        throw "Product not existed in the cart";
      }
    } catch (ex) {
      throw ex;
    }
  },
};
