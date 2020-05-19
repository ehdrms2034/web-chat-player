import React from "react";
import "../css/playView.css";
import Screen from "./Screen.js";
import ChatContainer from "./ChatContainer.js";

function PlayView({ match }) {
  // 파람스에서 아이디 말고 영상 정보를 다 받아왔으면 하는데 방법 찾는 중
  const movieId = match.params;
  console.log(match.params);
  console.log(movieId);

  // 아이디로 영상정보 받아오기 **
  if (!movieId) {
    return <div> 존재하지 않는 영상입니다 </div>;
  }

  return (
    <div className="PlayView">
      <section className="video">
        <Screen />
        <div className="playInfo">
          <div className="MovieTitle">영화 제목</div>
          <div className="MovieSummary">내용</div>
          <div className="MovieDate">날짜</div>
        </div>
      </section>
      <ChatContainer />
    </div>
  );
}

export default PlayView;
