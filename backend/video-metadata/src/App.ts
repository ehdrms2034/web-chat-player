import express from "express";
import cors from "cors";
import { errorHandler, logger } from "./middlewares";
import routers from "./routes";
import { initMongoose } from "./database";

const app = express();

// --------------------
//  Middlewares
// --------------------
app.use(logger());
app.use(cors());
app.use(express.json());

// --------------------
//  Initialize DB
// --------------------
initMongoose();

// --------------------
//  Routings
// --------------------
app.use("/", routers);

// --------------------
//  Error handling
// --------------------
app.use(errorHandler);

export default app;
