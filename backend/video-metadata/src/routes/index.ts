import express from "express";
import { getAllVideos, getSingleVideo } from "../controllers/video";

const router = express.Router();

router.get("/video/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getSingleVideo(id);
    return res.json(data);
  } catch (err) {
    return res.sendStatus(422);
  }
});

router.get("/videos", async (_req, res) => {
  const data = await getAllVideos();
  try {
    return res.json(data);
  } catch (error) {
    return res.sendStatus(404);
  }
});

export default router;
