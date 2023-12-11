const express = require("express");
const { connection } = require("./DataBase/db");
const { userRouter } = require("./Routes/users.router");
const { postRouter } = require("./Routes/post.router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(5400, async () => {
  try {
    await connection;
    console.log("DataBase is connected");
    console.log("Server is connected at 5400");
  } catch (error) {
    console.log(error);
  }
});
