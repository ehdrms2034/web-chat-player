import React from "react";

const Comment = ({ message: { id, text, createdAt, timeline } }) => (
  <div className="messageContainer">
    <p className="sentText pr-10">{id}</p>
    <div className="messageBox">
      <p className="messageText">{text}</p>
    </div>
    <p className="timeline pr-10">{timeline}</p>
    <p className="sentDate pr-10">{createdAt}</p>
  </div>
);

export default Comment;
