import React from "react";
import "../css/listView.css";
import MovieCard from "./MovieCard.js";

function ListView() {
  // 임시 데이터
  const videos = [
    {
      _id: "5ec284490d48beb75916beb6",
      name: "영화 왓수다 제1회",
      uploadedAt: "2020-04-24T00:00:00.000Z",
      summary: "MBC every1 최초 영화 전문 프로그램",
      posterUrl: "http://49.50.162.195:8080/videos/thumbnails/whatsuda.jpg",
      videoUrl: "http://49.50.162.195:8080/videos/whatsuda.m3u8",
    },
    {
      _id: "5ec284490d48beb75916beb7",
      name: "뭉찬외전 - 감독님이 보고 계셔 오싹한 과외 제1회",
      uploadedAt: "2020-04-26T00:00:00.000Z",
      summary: "어쩌다FC 전설들이 10세 수준의 축구 실력을 탈출하기 위해 '오싹한' 심화 보충수업을 받는 이야기",
      posterUrl: "http://49.50.162.195:8080/videos/thumbnails/mungchan.jpg",
      videoUrl: "http://49.50.162.195:8080/videos/mungchan.m3u8",
    },
  ];
  return (
    <div className="ListView">
      <h2>영상 목록</h2>
      {videos.map((video) => (
        <MovieCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default ListView;
