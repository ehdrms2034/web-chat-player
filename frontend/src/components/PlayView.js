import React from "react";
import "../css/playView.css";
import Screen from "./Screen.js";
import ChatContainer from "./ChatContainer.js";
import axios from "axios";

function PlayView({ match }) {
  const videoId = match.params.id;
  const [video, setVideos] = React.useState({});
  const METADATA_BASE_URL = "http://27.96.130.172/api/video";

  React.useEffect(() => {
    axios
      .get(`${METADATA_BASE_URL}/video/${videoId}`)
      .then((res) => setVideos(res.data))
      .catch((err) => setVideos([]));
  }, [videoId]);

  if (!videoId) {
    return <div> 존재하지 않는 영상입니다 </div>;
  }

  return (
    <div className="PlayView">
      <section className="video">
        <Screen /> {/* TODO: react-Player in <Screen /> */}
        <div className="playInfo">
          <div className="MovieTitle">{video.name}</div>
          <div className="MovieSummary">{video.summary}</div>
          <div className="MovieDate">{new Date(video.uploadedAt).toLocaleDateString()}</div>
        </div>
      </section>
      <ChatContainer _videoId={videoId} />
    </div>
  );
}

export default PlayView;
