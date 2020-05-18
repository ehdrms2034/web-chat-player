var path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "..//config/.env"),
});
const moment = require("moment");

const mongoose = require("../models");
const UserService = require("../services/db/UserService");
const VideoService = require("../services/db/VideoService");
const CommentService = require("../services/db/CommentService");

// describe("db", () => {
//   beforeEach(() => {
//     mongoose;
//   });

//   it("test", async () => {
//     const userService = new UserService();
//     const videoService = new VideoService();
//     videoService.createVideo(
//       "영화 왓수다 제1회",
//       new Date("2020-04-24"),
//       "MBC every1 최초 영화 전문 프로그램",
//       "http://49.50.162.195:8080/videos/thumbnails/whatsuda.jpg",
//       "http://49.50.162.195:8080/videos/whatsuda"
//     );
//     videoService.createVideo(
//       "뭉찬외전 - 감독님이 보고 계셔 오싹한 과외 제1회",
//       new Date("2020-04-26"),
//       "어쩌다FC 전설들이 10세 수준의 축구 실력을 탈출하기 위해 '오싹한' 심화 보충수업을 받는 이야기",
//       "http://49.50.162.195:8080/videos/thumbnails/mungchan.jpg",
//       "http://49.50.162.195:8080/videos/mungchan.m3u8"
//     );
//     videoService.createVideo(
//       "아버지의 초상",
//       new Date("2016-01-28"),
//       `회사의 부당한 구조조정으로 인해 한 순간에 실업자가 된 '티에리'.
//     그는 사랑하는 아내와 아들을 지켜야 하는 한 집안의 가장이다.
//     2년 간의 구직활동 끝에 그는 대형마트의 보안요원으로 취직하게 되고,
//     매장 내 감시카메라를 통해 모든 사람을 감시하는 업무를 맡게 된다.
//     그러나 일자리를 얻은 기쁨도...`,
//       "http://49.50.162.195:8080/videos/thumbnails/father.jpg",
//       "http://49.50.162.195:8080/videos/father.m3u8"
//     );
//     videoService.createVideo(
//       "하트비트",
//       new Date("2010-11-25"),
//       `마리와 그녀의 절친한 친구이자 게이인 프랑시스. 영리하고 날카로운 마리와 다정하고 섬세한 프랑시스는 서로를 보완하는 좋은 친구사이다. 취미는 달라도 취향은 같은 두 친구는 늘 함께 어울리며 서로를 아끼며 지켜주는 든든한 버팀목이 되어왔다. 어느 날, 두 사람은 친구들과 어울린 파티에서 아름다운 니콜라를 만나 둘 다 첫눈에 반한다. 만남이 거듭될수록 운명적 사랑이라 느껴지는 그가 보내오는 셀 수 없는 무수한 사랑과 관심의 신호들에 설레며, 프랑시스와 마리는 점점 더 깊이 니콜라에게 빠져든다. 마리와 프랑시스는 서로의 우정이 변할 수 있을 거라고는 단 한번도 의심해 본 적이 없지만 아도니스를 닮은 매력적인 니콜라 앞에서, 두 사람 모두 사랑 앞에서 한치도 물러설 수 없는 라이벌이 된다. 곧 두 친구는 자신들이 결코 깨지지 않을 거라 믿었던 우정이 이 사랑의 경쟁 앞에서 무너질 위기에 처했다는 것을 알게 되는데….`,
//       "http://49.50.162.195:8080/videos/thumbnails/heartbeat.jpg",
//       "http://49.50.162.195:8080/videos/heartbeat.m3u8"
//     );
//     videoService.createVideo(
//       "<강(江),원래> 초이스 2 :: 자전거의 이름으로(무료)",
//       new Date("2020-01-02"),
//       `다큐멘터리 감독과 미디어 활동가들이 카메라를 들고 한강, 낙동강, 금강, 영산강, 섬진강을 두루 다니며, 헤아릴 수 없이 시간을 흘러온 강과 그 강과 함께 살아온 생명들, 그리고 사람들의 나지막한 목소리에 귀 기울인다. "강(江), 원래"는 '강을 원래대로 두라!'는 사람들의 절박한 호소이다.
//       섬진강 시멘트 도로의 비포 앤 에프터 사진이 트위터를 통해 확산되고, 우리는 자전거 생활자인 지음, 살구와 함께 섬진강에 내려간다.`,
//       "http://49.50.162.195:8080/videos/thumbnails/river.jpg",
//       "http://49.50.162.195:8080/videos/river.m3u8"
//     );
//     videoService.createVideo(
//       "또한번 엔딩 특별회",
//       new Date("2020-03-21"),
//       "'신혼부부 전세 대출'을 받기 위해 결혼을 결심한 비혼주의자들의 아찔한 결혼 사기 로맨스",
//       "http://49.50.162.195:8080/videos/thumbnails/ending.png",
//       "http://49.50.162.195:8080/videos/ending.m3u8"
//     );
//   });
// });

describe("db", () => {
  beforeEach(() => {
    mongoose;
  });

  it("test", async () => {
    const userService = new UserService();
    const videoService = new VideoService();
    const commentService = new CommentService();
    const userData = await userService.getAllUsers();
    const videoData = await videoService.getAllVideos();
    // console.log(userData[0]);
    // console.log(videoData[0]);

    // await commentService.createComment(userData[0]._id,videoData[0]._id,"헬로우","21:21");
    // const data = await commentService.getAllComment();
    // console.log(data);
    // userService.createUser("cookie","helloworld");
    const data = await userService.getNickname("abcd");
    console.log(data);
    // data = await commentService.getCommentsByVideo(videoData[0],"00:00",1000);
    // console.log(data);
});
});
