import { Video } from "../types/video";
import moment from "moment";
const dummy: Video[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
  return {
    name: `영상이름${i}`,
    publishedAt: moment().toDate(),
    summary: `영상본문${i}`,
    views: i,
  };
});

export default dummy;
