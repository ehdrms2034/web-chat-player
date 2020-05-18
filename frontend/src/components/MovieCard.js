import React from "react";
import "../css/listView.css";
import { Link } from "react-router-dom";

function MovieCard(props) {
  // 임시 데이터
  const video = props.video;
  const date = video.uploadedAt.slice(0, 10).split("-").join(".");
  const url = `videos/${video._id}`;

  return (
    <Link to={url}>
      <div className="MovieCard">
        <div className="MoviePoster">
          <img src={video.posterUrl} alt="썸네일" />
        </div>
        <div className="MovieInfo">
          <div className="MovieTitle">{video.name}</div>
          <div className="MovieSummary">{video.summary}</div>
          <div className="MovieDate">{date}</div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
