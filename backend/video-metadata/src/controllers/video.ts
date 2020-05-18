import fetch, { RequestInit } from "node-fetch";
import { Video, VideoWrapper } from "../types/video";

export async function getVideoList(): Promise<Video[]> {
  const URL = `//${process.env.DB_SERVER}/videos`;
  const options: RequestInit = {
    /* body: { }, */
    method: "GET",
  };
  try {
    const res = await fetch(URL, options);
    const resData = <VideoWrapper>await res.json();
    return resData["data"];
  } catch (error) {
    throw error;
  }
}
