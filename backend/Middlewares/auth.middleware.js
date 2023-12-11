const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.tokenKey, (err, decoded) => {
      if (decoded) {
        req.body.userId = decoded.userId;
        req.body.username = decoded.username;

        next();
      } else {
        res.send("You are not Authorised");
      }
    });
  } else {
    res.send("You are not Authorised");
  }
};

module.exports = {
  auth,
};
