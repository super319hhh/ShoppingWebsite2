var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
//const Event = require("../models/events");
const User = require("../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const graphQlSchema = require("../Schema/index");
const graphQlResolvers = require("../resolvers/index");

module.exports = (app) => {
  //   app.all("*", (req, res, next) => {
  //       res.writeHead(200, {"Content-Type": "text/plain"})
  //       next()
  //   });

  app.use(bodyParser.json());

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
    })
  );
};
