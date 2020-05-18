const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.url = url;

db.on("open", () => {
  console.log("DB Connection on");
});

db.on("error", () => {
  console.log("connection Error");
});

module.exports = db;
