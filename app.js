const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
require("./dataBase/mongo")();

app.use(cors())
app.use(express.json());

const userRouter = require("./router/userRouter");

const port = process.env.PORT

app.use('/users',userRouter);


app.listen({port}, console.log(`server is running on port ${port}`))