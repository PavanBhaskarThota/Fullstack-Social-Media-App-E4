const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(200).send("This email is already register");
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      req.body.password = hash;
      const user = new UserModel(req.body);
      await user.save();
      res.status(200).send({ msg: "new user has add", Username: user.name });
    });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
      const token = jwt.sign({userId:user._id, username:user.name}, process.env.tokenKey)

          res.status(200).send({ msg: "Login Successfull",token:token });
        } else {
          res.status(200).send({ msg: "Wrong Password or Credentials!" });
        }
      });
    } else {
      res
        .status(200)
        .send({ msg: "User dose not exist with this email please Register!" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

module.exports = {
  userRouter,
};
