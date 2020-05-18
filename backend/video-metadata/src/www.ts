import "../.env";
import app from "./App";
import moment from "moment";

// -----------------------------
//  check env variables
// -----------------------------
const _checkEnvVars = () => {
  const {} = process.env;

  [].forEach((envVal) => {
    if (!envVal) {
      console.error(`${envVal} should be specified`);
      process.exit(1);
    }
  });
};

_checkEnvVars();

// -----------------------------
//  init server
// -----------------------------
const port = Number(process.env.PORT) || 9000;

app
  .listen(port, () => {
    const curDate = moment().toDate();
    console.log(`Express server listening at ${port} (${curDate})`);
  })
  .on("error", (err) => console.error(err));
