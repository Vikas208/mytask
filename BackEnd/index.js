const express = require("express");
const app = express();
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const login = require("./Router/login");
const task = require("./Router/Task");
const mongoConnect = require("./MongoConnect/mongoConnect");
const project = require("./Router/Project");

mongoConnect();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use("/login", login);
app.use("/task", task);
app.use("/project", project);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  console.log("Server side");
});

app.listen(port, () => {
  console.log("Server Listening On Port:" + port);
});
