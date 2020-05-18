import express from "express";
import cors from "cors";
import { errorHandler, logger } from "./middlewares";
import routers from "./routes";

const app = express();

// --------------------
//  Middlewares
// --------------------
app.use(logger());
app.use(cors());
app.use(express.json());

// --------------------
//  Routings
// --------------------
app.use("/", routers);

// --------------------
//  Error handling
// --------------------
app.use(errorHandler);

export default app;
