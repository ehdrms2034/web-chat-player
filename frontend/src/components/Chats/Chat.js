import React from "react";

const Chat = (props) => {
    return (
      <div className="Chat">
        <p style={{color:"white"}}>{props.uid} {props.msg} {props.createdAt} {props.timeline} </p>
      </div>
    );
  }
  
export default Chat;