const userResolver = require("./user");
const productResolver = require("./product");
const cartResolver = require("./cart");
const orderResolver = require("./order");

const rootResolver = {
  ...userResolver,
  ...productResolver,
  ...cartResolver,
  ...orderResolver,
};

module.exports = rootResolver;
