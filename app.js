var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var user = require("./routes/user");
var User = require("./model/userModel");
var events = require("./routes/events");
var app = express();
var cookieParser = require("cookie-parser");
var env = require("dotenv").config();
const sequelize = require("./utils/db");
const cors = require("cors");

sequelize.sync();
var LocalStrategy = require("passport-local").Strategy;
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })
);

app.use(passport.initialize());

app.use(passport.session());
require("./utils/passport")(passport, User);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

app.use("/user", user);
app.use("/events", events);

app.use(express.static(__dirname + "/dist/eventApp"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/eventApp/index.html"));
});
app.listen(process.env.PORT || 3000, function (err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});
