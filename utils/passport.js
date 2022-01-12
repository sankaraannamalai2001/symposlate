var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bCrypt = require("bcrypt");
const User = require("../model/userModel");
const passport = require("passport");
module.exports = function (passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",

        passwordField: "password",

        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, username, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, 9);
        };

        User.findOne({
          where: {
            username: username,
          },
        }).then(function (user) {
          if (user) {
            return done(null, false, {
              message: "That username is already taken",
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              username: username,
              password: userPassword,
              email: req.body.email,
              registerId: req.body.registerId,
              yourname: req.body.yourname,
            };

            User.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, username, password, done) {
        var User = user;

        var isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            username: username,
          },
        })
          .then(function (user) {
            if (!user) {
              return done(null, false, {
                message: "Username or password does not exist",
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Username or password is incorrect",
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Login",
            });
          });
      }
    )
  );
};
passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});
