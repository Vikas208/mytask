const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: String,
  },
});

module.exports = mongoose.model("projects", Project);
