import express from "express";
import { getAllVideos, getSingleVideo } from "../controllers/video";

const router = express.Router();

router.get("/video/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getSingleVideo(id);
  return res.json(data);
});

router.get("/videos", async (_req, res) => {
  const data = await getAllVideos();
  return res.json(data);
});

export default router;
