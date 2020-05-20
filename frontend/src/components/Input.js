import React from "react";

const Input = React.forwardRef(({ sendMessage }, ref) => {
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
        ref={ref}
        className="input"
        type="text"
        placeholder="현재 보고계신 부분에 코멘트를 입력하세요"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <button className="sendButton" onClick={submitHandler}>
        전송
      </button>
    </form>
  );
});

export default Input;
