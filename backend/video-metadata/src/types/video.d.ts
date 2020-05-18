import { Document } from "mongoose";

export interface Video extends Document {
  name: string;
  uploadedAt: Date;
  summary: string;
  url: string;
}
