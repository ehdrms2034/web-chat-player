import React from "react";
import "../css/playView.css";
import Screen from "./Screen.js";
import ChatContainer from "./ChatContainer.js";
import axios from "axios";

function PlayView({ match }) {
  // 파람스에서 아이디 말고 영상 정보를 다 받아왔으면 하는데 방법 찾는 중 --> 찾으시기 전까진 아래 방법으로 가시죠
  const movieId = match.params.id;
  const [video, setVideos] = React.useState({});
  React.useEffect(() => {
    axios
      .get(`http://27.96.135.160:3000/video/${movieId}`)
      .then((res) => setVideos(res.data))
      .catch((err) => setVideos([]));
  }, [movieId]);

  if (!movieId) {
    return <div> 존재하지 않는 영상입니다 </div>;
  }

  return (
    <div className="PlayView">
      <section className="video">
        <Screen />
        <div className="playInfo">
          <div className="MovieTitle">{video.name}</div>
          <div className="MovieSummary">{video.summary}</div>
          <div className="MovieDate">
            {new Date(video.uploadedAt).toLocaleDateString()}
          </div>
        </div>
      </section>
      <ChatContainer />
    </div>
  );
}

export default PlayView;
