"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var loginMiddleware = function (store) { return function (next) { return function (action) {
    if (action.type === "posts/login/fulfilled") {
        index_1.history.push("/product");
    }
    if (action.type === "posts/logout/fulfilled") {
        index_1.history.push("/");
        window.location.reload();
    }
    return next(action);
}; }; };
exports["default"] = loginMiddleware;
