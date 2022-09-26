const Product = require("../models/product");
const User = require("../models/user");

const product = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId });

    return {
      ...product._doc,
      _id: productId,
    };
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });

    return {
      ...user._doc,
      _id: userId,
    };
  } catch (err) {
    throw err;
  }
};

exports.product = product;
exports.user = user;
