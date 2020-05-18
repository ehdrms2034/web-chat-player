import fetch, { RequestInit } from "node-fetch";
import { Video, VideoWrapper } from "../types/video";
import dummy from "./dummyData";

export async function getVideoList(): Promise<Video[]> {
  const URL = `//${process.env.DB_SERVER}/videos`;
  const options: RequestInit = {
    /* body: { }, */
    method: "GET",
  };
  try {
    /* TODO: dummy data --> real API call
    const res = await fetch(URL, options);
    const resData = <VideoWrapper>await res.json();
    return resData["data"]; */

    return dummy;
  } catch (error) {
    throw error;
  }
}
