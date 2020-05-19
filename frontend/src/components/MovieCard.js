import React from "react";
import "../css/listView.css";
import { Link } from "react-router-dom";

function MovieCard(props) {
  // 임시 데이터
  const video = props.video;
  const date = video.uploadedAt.slice(0, 10).split("-").join(".");
  const url = `videos/${video._id}`;
  const slicedSum = video.summary.length > 60 ? `${video.summary.slice(0,60)}...` : video.summary

  return (
    <Link to={url}>
      <div className="MovieCard">
        <div className="MoviePoster">
          <img src={video.posterUrl} alt="썸네일" />
        </div>
        <div className="MovieInfo">
          <h3 className="MovieTitle"> {video.name} </h3>
          <div className="MovieSummary"> {slicedSum} </div>
          <div className="MovieDate"> {date} </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
