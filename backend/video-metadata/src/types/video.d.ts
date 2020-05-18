export interface Video {
  name?: string;
  views?: number;
  publishedAt?: Date;
  summary: string;
}

export interface VideoWrapper {
  data: Video[];
}
