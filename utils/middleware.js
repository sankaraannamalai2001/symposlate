module.exports.isLoggedIn = (req, res, next) => {
  const cookie = Object.values(req.sessionStore.sessions);
  const obj = JSON.parse(cookie[0]);
  if (obj.isAuthenticated == true) return next();
  res.status(400).send("Unauthorized");
};
