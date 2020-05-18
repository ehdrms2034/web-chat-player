import express from "express";
import morgan from "morgan";

const logger = (): express.RequestHandler => {
  return morgan("dev");
};

export default logger;
