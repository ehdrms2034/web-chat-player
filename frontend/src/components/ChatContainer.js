import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Comments from "./Comments";
import Input from "./Input";
import Axios from "axios";

import useInterval from "@use-it/interval";

const COMMENT_BASE_URL = "http://27.96.130.172/api/comment/";
const COMMENT_SLICE_LENGTH = 30;

let socket;

// 정해진 분량의 댓글을 호출하는 함수입니다. 주기적으로 불러줄 대상입니다.
const _getComments = async (videoId, startTime = 0, until = COMMENT_SLICE_LENGTH) => {
  const URL = `${COMMENT_BASE_URL}getComments?video=${videoId}&timeline=${startTime}&duration=${startTime + until}`;
  try {
    const data = await Axios.get(URL).then((res) => res.data);
    if (data.response === "error") throw data;
    return data.data;
  } catch (error) {
    const errComment = {
      id: "관리자",
      text: `현재 댓글 서버가 원활하지 않습니다. ${JSON.stringify(error)}`,
      createdAt: new Date().toISOString(),
      timeline: 0.0,
      video: videoId,
    };
    return [errComment];
  }
};

const ChatContainer = ({ _name, _timeline, _videoId }) => {
  const [timeline, setTimeline] = useState(0); // TODO: <-- 동영상 플레이어에서 전달받기 (임시 state임)
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "ws://49.50.173.151:3000";

  // 동영상이 0초, 30초, 60초, 90초, ... 를 지날때마다 30초만큼의 댓글을 호출함
  useEffect(() => {
    // - 최초 1회 처리
    // - "+5" 는 약간의 보정치입니다. 콜을 보내고 받는 시간 사이에 댓글이 누락되는 구간이 있을 것 같아서
    //   조금 일찍, 더 많이 받도록 하였습니다.
    _getComments(_videoId, Math.floor(timeline), COMMENT_SLICE_LENGTH + 5).then((comments) => setMessages(comments));
  }, []);
  useInterval(() => {
    // - 이후 ${COMMENT_SLICE_LENGTH}만큼의 시간이 지날때마다 처리
    // TODO : 받아온 댓글은 중복이 없도록 필터링해야 합니다. 즉 겹치는 부분은 버려야 합니다.
    _getComments(_videoId, Math.floor(timeline), COMMENT_SLICE_LENGTH + 5).then((comments) =>
      setMessages([...messages, comments])
    );
  }, COMMENT_SLICE_LENGTH * 1000);

  // 소켓은 최초 1회만 연결
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.once("connect", () => console.log(`INFO (ChatContainer.js) : 소켓 : 연결완료`));
    socket.emit("join", "video1");
  }, []);

  // 이후 소켓 한 번 호출 때마다 호출 열었다 닫았다 함. 이렇게 하는 이유는 state(messages)를 추적하지 못해서.
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log(`INFO (ChatContainer.js) : 새 메시지 수신 : ${JSON.stringify(newMessage, null, 2)}`);
      const nextMessages = [...messages, newMessage];

      nextMessages.sort((a, b) => (a.timeline < b.timeline ? -1 : a.timeline === b.timeline ? 0 : 1)); // 시간 순 정렬
      console.log(`INFO (ChatContainer.js) : 현재 보관중인 메시지 목록 : ${JSON.stringify(nextMessages, null, 2)}`);
      setMessages(nextMessages);
    });
    return () => socket.off("newMessage");
  }, [messages]);

  // TODO : 비디오에서 가져오는 걸로 바꾸어야 함. 이건 단지 동영상 흘러가는 느낌을 주는 타임라인일 뿐.
  useEffect(() => {
    // 1초에 1씩 timeline 증가
    setTimeout(() => {
      console.log(`INFO (ChatContainer.js) : 시간 경과 흉내내기 : ${timeline}`);
      setTimeline(timeline + 1);
    }, 1000);
  }, [timeline]);

  const sendMessage = (message) => {
    if (!message || message.length === 0) return;
    console.log(`INFO (ChatContainer.js) : 새 메시지 발송 : ${message}`);

    socket.emit(
      "newComment",
      {
        id: _name,
        message,
        createdAt: new Date(),
        timeline,
        video: "video1",
      },
      () => {} // QUESTION: 이 콜백은 무슨 역할을 하는 것인지?
    );
    // TODO : DB에도 데이터 쏴줘야됨. (w/Axios)
  };

  return (
    <div>
      <Comments messages={messages} timeline={timeline} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
