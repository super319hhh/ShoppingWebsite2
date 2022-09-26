const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        firstname: args.userInput.firstname,
        lastname: args.userInput.lastname,
        phone: args.userInput.phone,
        address: args.userInput.address,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  users: async (args, req) => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
