import { Video } from "../types/video";
import VideoCollecition from "../database/models/video";

export async function getAllVideos(): Promise<Video[]> {
  // find without options === findAll()
  return await VideoCollecition.find((err, videos) => {
    if (err) throw err;
    return videos;
  });
}
export async function getSingleVideo(id: string): Promise<Video | null> {
  return await VideoCollecition.findById(id, (err, video) => {
    if (err) throw err;
    return video;
  });
}
