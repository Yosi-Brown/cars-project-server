const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./dataBase/mongo")();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
  })
);

//import routers
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const { pushToDb } = require("./dataBase/API/createAPI");


app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/pushAPI", pushToDb);

const port = process.env.PORT;

app.listen({ port }, console.log(`server is running on port ${port}`));
