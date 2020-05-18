const Video = require("../../models/video");

class VideoService {
  constructor() {}

  async createVideo(name, uploadedAt, summary, posterUrl, videoUrl) {
    const newVideo = new Video({name,uploadedAt,summary, posterUrl, videoUrl});
    await newVideo.save(); 
  }

  async getAllVideos() {
    return await Video.find();
  }
}

module.exports = VideoService;
