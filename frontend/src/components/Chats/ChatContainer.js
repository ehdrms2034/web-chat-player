import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useImmer } from 'use-immer'; // 불변성 유지를 위함!
import io from 'socket.io-client';
import ChatList from './ChatList'; //chat들을 렌더링할 list component

const endpoint = "ws://49.50.162.195:3000";
var socket = io(endpoint);   
const ChatContainer = () => {
  const [roomName, joinRoom] = useState('');
  const [clientMsg, handleNewMsg] = useState('');
  const [msgs, handleAllMsgs] = useImmer([]); 

  //2번째 인자가 []면 처음 한 번만 실행.
  useEffect(() => {
    socket.on('newMessage', (data)=> {
        handleAllMsgs(msgs => {
            msgs.push(data); // 불변성 관리 useImmer가 해줌
        });
      });
  }, []);

  const onChangeRoomName = e => {
    joinRoom(e.target.value);
  };
  const onChangeMsg = e => {
    handleNewMsg(e.target.value);
  };

  const onJoinRoom = () => {
    socket.emit('join', roomName);
  }
  const sendMsg = () => {
    socket.emit('newComment', {id: "example-id", message:clientMsg, createdAt: new Date(), timeline:"11:11:11", video:roomName});
    handleNewMsg(''); //input 비우기
 }
  
  return (
    <div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
         <input onChange={onChangeRoomName} value={roomName} />                 
         <button onClick={onJoinRoom}>채팅방조인</button>
         <input onChange={onChangeMsg} value={clientMsg}/> 
         <button onClick={sendMsg}>메시지보내기</button> 
         <ChatList chats={msgs}/>
    </div>
  );  
}

export default ChatContainer;


