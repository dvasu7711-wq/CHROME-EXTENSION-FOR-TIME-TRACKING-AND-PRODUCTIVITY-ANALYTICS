const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  site: String,
  time: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TimeData", TimeSchema);