import React, { useRef, createRef, useEffect, useState } from "react";
import "../css/playView.css";
import io from "socket.io-client";
import Comment from "./Comment.js";
import Input from "./Input";

let socket;

const ChatContainer = ({ _name, _timeline }) => {
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "ws://49.50.173.151:3000";
  const $input = createRef();
  const $commentContainer = useRef();

  useEffect(() => {
    const name = _name;
    setName(name);

    socket = io(ENDPOINT);

    let video = "video1"; // 임시데이터. 나중에 영상별 구분할 수 있는 고유값을 보내줘야 함.
    socket.emit("join", video);
    console.log("send join message");
  }, [ENDPOINT, _name]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      // 여기서 타임라인에 맞게 거를 메시지는 거르고 추가할 메시지는 추가해서 정렬해야함.
      //   console.log("new message", message);
      setMessages([...messages, message]);
    });
    // To bottom
    console.log($commentContainer.current.scrollHeight);
    $commentContainer.current.scrollTo(0, $commentContainer.current.scrollHeight);
  }, [messages]);

  // 타임라인 매번 갱신
  // useEffect(() => {
  //   const timeline = _timeline;
  //   setTimeline(timeline);
  // }), [_timeline];

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send message", message);
    //계속 focusing
    $input.current.focus();

    if (message) {
      // 원래 이건데 임시 데이터로 대체함.
      // socket.emit('newComment', ({name, message, createdAt, timeline}), () => setMessage(''))
      socket.emit(
        "newComment",
        {
          id: "닉네임",
          message: message,
          createdAt: "생성시간",
          timeline: "타임라인",
          video: "video1",
        },
        () => setMessage("")
      );
      // DB REST API 들어가야함.
    }
  };
  const Messages = messages.map((message, index) => <Comment key={index} message={message} />);

  return (
    <div className="ChatContainer">
      <div ref={$commentContainer} className="commentContainer">
        <div className="chatHeader">타임라인별 댓글</div>
        {Messages}
      </div>
      <Input ref={$input} message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
