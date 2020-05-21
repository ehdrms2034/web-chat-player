import { VideoCollection, Video } from "../database/models/video";

export async function getAllVideos(): Promise<Video[]> {
  try {
    // find without options === findAll()
    const data = await VideoCollection.find();
    return data;
  } catch (err) {
    throw err;
  }
}
export async function getSingleVideo(id: string): Promise<Video | null> {
  try {
    const data = await VideoCollection.findById(id);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function saveSigleVideo(name: string, summary: string, posterUrl: string, videoUrl: string) {
  try {
    const newVideo = new VideoCollection({
      name,summary,posterUrl,videoUrl
    });
    return await newVideo.save();
  }catch (err){
    throw err;
  }
}