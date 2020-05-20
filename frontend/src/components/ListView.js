import React from "react";
import "../css/listView.css";
import MovieCard from "./MovieCard.js";
import axios from "axios";

function ListView() {
  console.log("ListView");
  const [videos, setVideos] = React.useState([]);
  const METADATA_BASE_URL = "http://27.96.130.172/api/video";

  React.useEffect(() => {
    axios.get(`${METADATA_BASE_URL}/videos`).then((res) => {
      setVideos(res.data);
    });
  }, []);

  const Videos = videos.map((video) => <MovieCard key={video._id} video={video} />);

  return (
    <div className="ListView">
      <h2>영상 목록</h2>
      <div className="videoContainer">{Videos}</div>
    </div>
  );
}

export default ListView;
