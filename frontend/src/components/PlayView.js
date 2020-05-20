import React from "react";
import "../css/playView.css";
import ChatContainer from "./ChatContainer.js";
import axios from "axios";
import ReactPlayer from "react-player";

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
        <ReactPlayer
          className="Screen"
          // ref={ref}
          url={"http://49.50.162.195:8080/videos/whatsuda.m3u8"}
          playing
          // onReady={onPlayerReady}
          controls={true}
          onSeek={(e) => console.log(e)}
          // onProgress={onProgress}
        />
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
