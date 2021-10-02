const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movie_title: {
    type: String,
    required: false
  },
  actor_one: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    }
  },
  actor_two: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    }
  },
  actor_three: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("movies", MovieSchema);