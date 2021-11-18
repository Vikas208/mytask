const mongoose = require("mongoose");

const task = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  title: {
    type: String,
    default: "no title",
  },
  description: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
  },
  isComplete: {
    type: Boolean,
  },
});
module.exports = mongoose.model("tasks", task);
