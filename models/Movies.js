const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movie_title: {
    type: String,
    required: false
  },
  actor_one: {
    type: String,
    required: false
  },
  actor_two: {
    type: String,
    required: true
  },
  actor_three: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("movies", MovieSchema);