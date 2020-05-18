import { VideoCollection, Video } from "../database/models/video";

export async function getAllVideos(): Promise<Video[]> {
  // find without options === findAll()
  return await VideoCollection.find((err, videos) => {
    if (err) throw err;
    return videos;
  });
}
export async function getSingleVideo(id: string): Promise<Video | null> {
  return await VideoCollection.findById(id, (err, video) => {
    if (err) throw err;
    return video;
  });
}
