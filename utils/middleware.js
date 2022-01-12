const { JSONCookie, JSONCookies } = require("cookie-parser");
var express = require("express");
var app = express();
module.exports.isLoggedIn = (req, res, next) => {
  const cookie = Object.values(req.sessionStore.sessions);
  const obj = JSON.parse(cookie[0]);
  //console.log(obj);
  // console.log(req);
  // console.log(req.sessions);
  // console.log(req.isUnauthenticated());
  // console.log(res.isAuthenticated);
  // var property = "user";
  // if (req._passport && req._passport.instance) {
  //   property = req._passport.instance._userProperty || "user";
  // }

  // console.log(req[property] ? true : false);
  if (obj.isAuthenticated == true) return next();
  res.status(400).send("Unauthorized");
};
