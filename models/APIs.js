const mongoose = require("mongoose");

const APISchema = new mongoose.Schema({
  google_count: {
    type: Int32,
    required: false
  },
  imdb_count: {
    type: Int32,
    required: false
  }

});

module.exports = mongoose.model("apis", APISchema);