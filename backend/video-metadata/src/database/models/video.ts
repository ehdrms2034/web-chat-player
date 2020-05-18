import { model, Schema } from "mongoose";
import { Video } from "../../types/video";

const video = new Schema<Video>({
  name: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  summary: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

export default model<Video>("video", video);
