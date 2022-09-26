const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.user) {
    req.isAuth = true;
    req.email = req.user.email;
    req.userId = req.user._id;
  } else {
    req.isAuth = false;
  }

  next();
};
