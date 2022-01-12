const User = require("../model/userModel");
const bcrypt = require("bcrypt");
var Sequelize = require("sequelize");
const passport = require("passport");
var express = require("express");
var app = express();
const Op = Sequelize.Op;
//Refer passport.js from utils for register and login methods--ps:Sankar :)
exports.register = function (req, res, next) {
  passport.authenticate("local-signup", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send("Username already exists");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send(user);
    });
  })(req, res, next);
};

exports.login = function (req, res, next) {
  passport.authenticate("local-signin", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        statusCode: 200,
        message: "Username or Password is incorrect",
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      //console.log(req.user);
      req.session.isAuthenticated = true;
      req.isAuthenticated = true;
      res.locals.isAuthenticated = true;
      res.locals.user = req.user;
      return res
        .status(200)
        .json({ statusCode: 200, message: "success", user_id: user.user_id });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    return res.status(200);
  });
};

exports.isAuthenticated = (req, res, next) => {
  console.log("hello");
  return res.status(200).send(req.user);
};
