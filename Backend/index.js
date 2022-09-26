var express = require("express");
var app = express();
var hbs = require("hbs");
var path = require("path");
var mongoose = require("mongoose");
var session = require("express-session");
var bodyparser = require("body-parser");
var cors = require("cors");
var isAuth = require("./middleware/isAuth");
var passport = require("passport");
var initializePassport = require("./resolvers/passport-config");
var cookieParser = require("cookie-parser");
//var { loadSchemaSync } = require("@graphql-tools/load");

mongoose
  .connect(`mongodb://127.0.0.1/Shopping`)
  .then(() => {
    app.use(cookieParser());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    // const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
    //   loaders: [new GraphQLFileLoader()],
    // });

    const corsOptions = {
      origin: "http://localhost:9000",
      credentials: true,
    };

    app.use(cors(corsOptions));

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authorization"
      );

      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }

      next();
    });

    app.use(
      session({
        secret: "anything",
        resave: false,
        saveUninitialized: true,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    initializePassport(passport);
    //app.use(isAuth);

    app.post("/login", (req, res, next) => {
      passport.authenticate(
        "local",
        {
          failureRedirect: "/login",
        },
        (err, user, info) => {
          if (err) {
            console.log(err);
          }
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }

            res.send({ data: { user: user._doc } });
          });
        }
      )(req, res);
    });
    app.get("/", (req, res) => {
      res.send("");
    });
    app.post("/logout", (req, res, next) => {
      req.logout();
      req.session.destroy();
      res.redirect("/");
    });
    var routes = require("./routes")(app);
    app.listen(8082);
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });
