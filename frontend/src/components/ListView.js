import React from "react";
import "../css/listView.css";
import MovieCard from "./MovieCard.js";
import axios from "axios";

function ListView() {
  const [videos, setVideos] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://27.96.135.160:3000/videos").then((res) => {
      setVideos(res.data);
    });
  }, []);

  const Videos = videos.map((video) => (
    <MovieCard key={video._id} video={video} />
  ));

  return (
    <div className="ListView">
      <h2>영상 목록</h2>
      <div className="videoContainer">
      {Videos}
      </div>
    </div>
  );
}

export default ListView;
