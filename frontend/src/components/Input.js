import React from "react";

const Input = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendMessage(message);
    setMessage("");
  };
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="댓글을 입력해보아요."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <button className="sendButton" onClick={submitHandler}>
        전송
      </button>
    </form>
  );
};

export default Input;
