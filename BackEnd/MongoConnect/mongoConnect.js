const mongoose = require("mongoose");

require("dotenv").config({ path: "../config.env" });

const uri = `mongodb+srv://vikas:${process.env.PASSWORD}@cluster0.mzw6b.mongodb.net/MyTask?retryWrites=true&w=majority`;

const mongoConnect = () => {
  try {
    mongoose.connect(uri).then((res) => {
      //       console.log(res);
      console.log("Connected");
    });
  } catch (error) {
    console.log("Server Not Connected");
    console.log(error);
  }
};
module.exports = mongoConnect;
