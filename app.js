const express = require("express");
const app = express();

require("dotenv").config();
require("./dataBase/mongo")();


const port = process.env.PORT

app.listen({port}, console.log(`server is running on port ${port}`))