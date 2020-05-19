import React from "react";

export default Comment;

function Comment({ message: { id, text, createdAt } }) {
  return (
    <div className="Comment">
      <p className="nickNameTxt sentText pr-10">{id}</p>
      <div className="msgBox">
        <div className="messageText">{text}</div>
        <div className="sentDate pr-10">{createdAt}</div>
      </div>
    </div>
  );
}
