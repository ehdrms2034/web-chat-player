import React from "react";

function Comment({ message: { id, text, createdAt, timeline } }) {
  return (
    <div className="Comment">
      <p className="nickNameTxt sentText pr-10">{id}</p>
      <div className="msgBox">
        <div className="messageText">{text}</div>
        <div className="sentDate pr-10">{timeline}</div>
      </div>
    </div>
  );
}

export default Comment;
