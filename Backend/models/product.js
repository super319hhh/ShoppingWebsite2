const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  images: [
    {
      type: String,
      require: false,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
