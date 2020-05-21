import express from "express";
import { getAllVideos, getSingleVideo, saveSigleVideo } from "../controllers/video";

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

router.post("/video", async (req, res) => {
  const { name, summary, posterUrl, videoUrl } = req.body;
  try {
    if (name === undefined || summary === undefined || posterUrl === undefined || videoUrl === undefined)
      throw new Error("request body값이 없음");
    await saveSigleVideo(name, summary, posterUrl, videoUrl);
    return res.json({ response: "success", message: "성공적으로 영화를 DB에 저장했습니다." });
  } catch (error) {
    return res.json({ response: "error", message: "DB에 저장하는데 실패했습니다.", data: error.message });
  }
});

export default router;
