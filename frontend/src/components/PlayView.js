import React from "react";
import "../css/playView.css";
import ChatContainer from "./ChatContainer.js";
import axios from "axios";
import ReactPlayer from "react-player";

function PlayView({ match }) {
  const videoId = match.params.id;
  const [video, setVideos] = React.useState({});
  const METADATA_BASE_URL = "http://27.96.130.172/api/video";
  const [timeline, handleTime] = React.useState(0);
  const [lastPoint, handleLastPoint] = React.useState(0);

  let _player = "";
  React.useEffect(() => {
    axios
      .get(`${METADATA_BASE_URL}/video/${videoId}`)
      .then((res) => setVideos(res.data))
      .catch((err) => setVideos([]));
  }, [videoId]);

  const onPlayerReady = () => {
    const hlsInstance = _player.getInternalPlayer("hls");
    //console.log(hlsInstance);
    // Note that we can assume we have the `Hls` global here
    // as the player should be ready at this point
    hlsInstance.on(window.Hls.Events.FRAG_LOADED, (data) => {
      //console.log("FRAG_LOADED", data);
    });
  };

  if (!videoId) {
    return <div> 존재하지 않는 영상입니다 </div>;
  }
  const ref = (player) => {
    _player = player;
  };
  const onProgress = (p) => {
    handleTime(p.playedSeconds);
  };
  return (
    <div className="PlayView">
      <section className="Screen">
        <ReactPlayer
          className="react-player"
          ref={ref}
          url={video.videoUrl}
          playing
          onReady={onPlayerReady}
          controls={true}
          onSeek={(e) => handleLastPoint(Number(e))}
          onProgress={onProgress}
          width="60vw"
          height="auto"
        />
        <div className="playInfo">
          <div className="PlayTitle"> {video.name} </div> <div className="PlaySummary"> {video.summary} </div>
          <div className="PlayDate"> {new Date(video.uploadedAt).toLocaleDateString()} </div>
        </div>
      </section>
      <ChatContainer _timeline={timeline} _videoId={videoId} _lastPoint={lastPoint} />
    </div>
  );
}

export default PlayView;
