import express from "express";

const router = express.Router();

router.get("*", (_q, r) => {
  console.log("test");
  return r.sendStatus(200);
});

export default router;
