const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./dataBase/mongo")();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());

const userRouter = require("./router/userRouter");

const port = process.env.PORT;

app.use("/users", userRouter);

app.listen({ port }, console.log(`server is running on port ${port}`));
