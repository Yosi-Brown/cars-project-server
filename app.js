const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
require("./dataBase/mongo")();

app.use(cookieParser());
app.use(express.json());
app.use(logger("dev"));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    optionsSuccessStatus: 200,
  })
);

//import routers
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const ordersRouter = require("./router/orderRouter");
const categoriesRouter = require("./router/categoriesRouter")

// const { pushToDb,updateYear,addCategory, addCarTypeToCategories, orderNum } = require("./dataBase/API/createAPI");


app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);
app.use("/categories", categoriesRouter)
// app.use("/pushAPI", pushToDb);// חד פעמי
// app.use("/updateYear", updateYear);// חד פעמי
// app.use("/addCategory", addCategory);// חד פעמי
// app.use("/addCarTypeToCategories", addCarTypeToCategories);// חד פעמי
// app.use("/orderNum", orderNum);// חד פעמי

const port = process.env.PORT;

app.listen({ port }, console.log(`server is running on port ${port}`));
