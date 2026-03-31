const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  tokenNumber: {
    type: Number,
    required: true
  },

  userName: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "waiting"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Queue", queueSchema);