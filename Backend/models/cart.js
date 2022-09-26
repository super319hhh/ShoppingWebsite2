const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
