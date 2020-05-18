import React from "react";
import "../css/playView.css";

function PlayView({ match }) {
  const movieId = match.params;
  console.log(movieId);

  if (!movieId) {
    return <div> 존재하지 않는 영상입니다 </div>;
  }

  return <div className="PlayView"> 플레이 뷰! </div>;
}

export default PlayView;
