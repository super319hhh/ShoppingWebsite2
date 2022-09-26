const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

function initialize(passport) {
  passport.use(
    new LocalStrategy(async function (username, password, cb) {
      const user = await User.findOne({ email: username });

      if (user === null) {
        return createImageBitmap(null, false);
      }

      try {
        const isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "wrong password" });
        }
      } catch (e) {
        return cb(e);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._doc);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = initialize;
