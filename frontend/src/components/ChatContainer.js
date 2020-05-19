import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ReactPlayer from "react-player";

import Comments from "./Comments";
import Input from "./Input";

let socket;

const ChatContainer = ({ _name, _timeline }) => {
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "ws://49.50.173.151:3000";
  let _player = "";
  const [time, handleTime] = useState(0);

  const onPlayerReady = () => {
    const hlsInstance = _player.getInternalPlayer("hls");
    //console.log(hlsInstance);
    // Note that we can assume we have the `Hls` global here
    // as the player should be ready at this point
    hlsInstance.on(window.Hls.Events.FRAG_LOADED, (data) => {
      //console.log("FRAG_LOADED", data);
    });
  };
  const ref = (player) => {
    _player = player;
  };

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
      console.log("new message", message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  // 타임라인 매번 갱신
  // useEffect(() => {
  //   const timeline = _timeline;
  //   setTimeline(timeline);
  // }), [_timeline];

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send message", message);

    if (message) {
      // 원래 이건데 임시 데이터로 대체함.
      // socket.emit('newComment', ({name, message, createdAt, timeline}), () => setMessage(''))
      socket.emit(
        "newComment",
        {
          id: "닉네임",
          message: message,
          createdAt: new Date().getTime(),
          timeline: time,
          video: "video1",
        },
        () => setMessage("")
      );
      // DB REST API 들어가야함.
    }
  };
  const onProgress = (p) => {
    handleTime(p.playedSeconds);
  };

  return (
    <div>
      <ReactPlayer
        ref={ref}
        url={"http://49.50.162.195:8080/videos/whatsuda.m3u8"}
        playing
        onReady={onPlayerReady}
        controls={true}
        onSeek={(e) => console.log(e)}
        onProgress={onProgress}
      />
      <Comments messages={messages} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
