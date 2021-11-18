const mongoose = require("mongoose");
mongoose.set("debug", true);
const user = new mongoose.Schema({
  emailId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("users", user);
