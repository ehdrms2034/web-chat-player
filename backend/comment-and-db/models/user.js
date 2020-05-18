const mongoose = require("mongoose");

const { Schema } = mongoose;

const user = new Schema({
  cookie: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", user);
