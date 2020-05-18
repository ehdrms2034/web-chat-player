import { Video } from "../types/video";
import VideoCollecition from "../database/models/video";

export async function getVideoList(): Promise<Video[]> {
  // find without options === findAll()
  return await VideoCollecition.find((err, videos) => {
    if (err) throw err;
    return videos;
  });
}
