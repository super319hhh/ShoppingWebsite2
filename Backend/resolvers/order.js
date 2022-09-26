const Cart = require("../models/cart");
const Product = require("../models/product");
const { product, user } = require("./helper");
const User = require("../models/user");
const Order = require("../models/order");

module.exports = {
  placeOrder: async (args, req) => {
    try {
      if (!req.user) {
        throw "not authorized";
      }
      let carts = args.cart,
        result;

      let order = new Order({
        creator: req.user._id,
        products: await Promise.all(
          carts.map(async (item) => {
            productDetail = await Product.findOne({ _id: item.product });
            return {
              product: productDetail._id,
              quantity: item.quantity,
              price: productDetail._doc.price,
            };
          })
        ),
        date: new Date(),
        status: "Pending",
      });

      result = await order.save();
      let removeCart = await Cart.deleteMany({ creator: req.user._id });

      return result;
    } catch (err) {
      throw err;
    }
  },
  fetchOrders: async (args, req) => {
    try {
      if (!req.user) {
        throw "not authorized";
      }

      let userId = req.user._id;

      let orders = await Order.find({ creator: userId });

      return orders.map((order) => {
        return {
          id: order._id,
          ...order._doc,
          date: order._doc.date,
          products: order.products.map((item) => {
            return {
              quantity: item.quantity,
              price: item.price,
              product: product.bind(this, item.product),
            };
          }),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
