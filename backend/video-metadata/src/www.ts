import { config } from "dotenv";
config(); // init dotenv
import app from "./App";
import moment from "moment";

// -----------------------------
//  check env variables
// -----------------------------
const _checkEnvVars = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
  Object.entries({ DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD }).forEach(([key, value]) => {
    if (!value) {
      console.error(`Error on dotenv : '${key}' should be spefied in /.env`);
      process.exit(1);
    }
  });
};

_checkEnvVars();

// -----------------------------
//  init server
// -----------------------------
const port = Number(process.env.PORT) || 3000;

app
  .listen(port, () => {
    const curDate = moment().toDate();
    console.log(`Express server listening at ${port} (${curDate})`);
  })
  .on("error", (err) => console.error(err));
