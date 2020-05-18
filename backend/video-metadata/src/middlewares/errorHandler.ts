import express from "express";

const errorHandler = (err: Error, _req: express.Request, res: express.Response): express.Response => {
  const errorMsg = interpretError(err);
  console.error(`Server Error: ${errorMsg}`);
  return res.status(500).send(errorMsg);
};

export default errorHandler;

const interpretError = (value: Error) => {
  const { name, message, stack } = value;
  const payload = { name, message, stack };
  return JSON.stringify(payload);
};
