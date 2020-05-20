import React from "react";

const Input = React.forwardRef(({ setMessage, sendMessage, message }, ref) => {
  return (
    <form className="form">
      <input
        ref={ref}
        className="input"
        type="text"
        placeholder="현재 보고계신 부분에 코멘트를 입력하세요"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        등록
      </button>
    </form>
  );
});

export default Input;
