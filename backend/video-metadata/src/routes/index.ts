import express from "express";
import { getVideoList } from "../controllers/video";

const router = express.Router();

router.get("/videos", async (_req, res) => {
  const data = await getVideoList();
  return res.json(data);
});

export default router;
