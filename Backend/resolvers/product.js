const Product = require("../models/product");
const jwt = require("jsonwebtoken");

module.exports = {
  Products: async (args, req) => {
    try {
      if (!req.user) {
        throw "not authorized";
      }
      const products = await Product.find();
      return products.map((product) => {
        return {
          ...product._doc,
          _id: product._id,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args) => {
    try {
      const product = new Product({
        name: args.productInput.name,
        price: args.productInput.price,
        description: args.productInput.description,
        images: args.productInput.images,
      });

      const result = await product.save();

      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
  findProductsByName: async (args) => {
    try {
      const products = await Product.find({ name: new RegExp(args.name, "i") });

      return products.map((product) => {
        return {
          ...product._doc,
          _id: product._id,
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
