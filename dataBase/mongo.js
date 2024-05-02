const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connectDb(){
  try {
    await mongoose.connect(uri)
    console.log("connected to mongo db")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb;