const mongoose = require("mongoose");

const RosterSchema = mongoose.Schema({
  sort: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  weekday: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  spots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("roster", RosterSchema);
