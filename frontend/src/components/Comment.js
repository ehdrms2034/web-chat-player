import React from "react";
import { convertTime } from "./ChatContainer";
function Comment({ message: { nickname, message, createdAt, timeline } }) {
  return (
    <div className="Comment">
      <p className="nickNameTxt sentText pr-10">{nickname}</p>
      <div className="msgBox">
        <div className="messageText">{message}</div>
        <div className="sentDate pr-10">{convertTime(timeline)}</div>
      </div>
    </div>
  );
}

export default Comment;
