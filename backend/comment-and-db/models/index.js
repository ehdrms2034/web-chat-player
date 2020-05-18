const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (error) {
    console.log("mongoDB Connection Error : ",error);
}

const db = mongoose.connection;
db.url = url;

db.on("open", () => {
  console.log("DB Connection on");
});

db.on("error", error => {
  console.log("MongoDB Error : ", error);
});

module.exports = db;
