const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,"Title cannot be empty"]
  },
  content: {
    type: String,
    required: [true,"Post cannot be empty"]
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Doubt = mongoose.model("Doubt", doubtSchema);
module.exports = Doubt;
