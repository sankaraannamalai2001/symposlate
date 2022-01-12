const express = require("express");
const { isLoggedIn } = require("../utils/middleware");
const router = express.Router();
const userCon = require("../controller/userController");
router.get("/", (req, res) => {
  res.send("This is user route");
});
router.post("/login", userCon.login);
router.post("/register", userCon.register);
router.get("/logout", isLoggedIn, userCon.logout);
router.get("/isauth", isLoggedIn, (req, res) => {
  return res.status(200).json({ statusCode: 200, message: "success" });
});
module.exports = router;
