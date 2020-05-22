import { model, Schema, Document } from "mongoose";

export interface Video extends Document {
  name: string;
  uploadedAt: Date;
  summary: string;
  url: string;
}

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
  videoUrl: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
},{
  versionKey : false
});

const VideoCollection = model<Video>("video", video);
export { VideoCollection };
