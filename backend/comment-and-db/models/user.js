const mongoose = require("mongoose");

const { Schema } = mongoose;

const user = new Schema({
  cookie: {
    type: String,
    required: true,
    unique : true
  },
  nickname: {
    type: String,
    required: true,
  },
},{
  versionKey: false
});

module.exports = mongoose.model("user", user);
