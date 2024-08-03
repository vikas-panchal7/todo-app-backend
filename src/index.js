const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const todoRouter = require("./routers/todos");
const app = express();

app.use(cors());
const port = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/",userRouter);
app.use("/api/",todoRouter);

app.listen(port, () => {
  console.log("Server is running on port", +port);
});
