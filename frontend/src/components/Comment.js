import React from "react";

function Comment({ message: { nickname, message, createdAt, timeline } }) {
  return (
    <div className="Comment">
      <p className="nickNameTxt sentText pr-10">{nickname}</p>
      <div className="msgBox">
        <div className="messageText">{message}</div>
        <div className="sentDate pr-10">{timeline}</div>
      </div>
    </div>
  );
}

export default Comment;
