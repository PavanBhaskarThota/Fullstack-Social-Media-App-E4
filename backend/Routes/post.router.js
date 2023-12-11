const express = require("express");
const { PostModel } = require("../Models/post.model");
const { auth } = require("../Middlewares/auth.middleware");

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "new post has added" });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

postRouter.get("/", async (req, res) => {
  const { userId } = req.body;
  const { device } = req.query;
  try {
    const post = await PostModel.find({ userId });
    res.status(200).send({ posts: post });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });

    if (req.body.userId === post.userId) {
      await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: "post has updated" });
    } else {
      res.status(200).send({ msg: "you can not edit this post" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });

    if (req.body.userId === post.userId) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "post has Deleted" });
    } else {
      res.status(200).send({ msg: "you can not delete this post" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

module.exports = {
  postRouter,
};
