import { connect, connection } from "mongoose";
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const mongoUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export function initMongoose() {
  // listeners
  connection.once("open", () => {
    console.info("Info on Mongoose : connected.");
  });

  connection.on("error", (error) => {
    console.error(`Error on mongoose : ${error}`);
  });

  // try to connect
  try {
    connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(`Error on mongoose : ${error}`);
  }
}
