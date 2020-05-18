import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import socketio from 'socket.io-client';

import ChatBoard from './ChatBoard';
const socketServerURL = "ws://49.50.173.151:3000";

class Player extends Component {
  constructor(props) {
    super(props);
    this.client=null;
    this.state = {
        msgs: [],
        movie: "example"
    };
}
    componentDidMount() {
      this.establishConnection();
    }


    onPlayerReady = () => {
        const hlsInstance = this.player.getInternalPlayer('hls')
        console.log(hlsInstance)
        hlsInstance.on(window.Hls.Events.FRAG_LOADED, data => {
          console.log('FRAG_LOADED', data);
        })
      }
      ref = player => {
        this.player = player
      }
    establishConnection() {
      this.client = socketio.connect(socketServerURL, { transports: ['websocket'], upgrade: false });
      console.log("made connection");
      this.client.on('newMessage', (data)=> {
        this.setState({
            msgs : this.state.msgs.concat(data)
        });
      });
    }
    handleChange=(e)=> {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    sendMsg = () => {
      this.client.emit('newComment', {id: "example-id", message:this.state.clientMsg, createdAt: new Date(), timeline:"11:11:11", video:this.state.roomName});
    }
    joinRoom=()=> {
      this.client.emit('join', this.state.roomName);
    }
    render() {
     
        return (
            <div>
                 <ReactPlayer
                 ref={this.ref}
                 url={"http://49.50.162.195:8080/videos/whatsuda.m3u"} playing
                 onReady={this.onPlayerReady}
                 />
                <input onChange={this.handleChange} name="roomName"/>                 
                 <button onClick={this.joinRoom}>채팅방조인</button>
                 <input onChange={this.handleChange} name="clientMsg"/>

                 <button onClick={this.sendMsg}>메시지보내기</button>
                <div>
                  <ChatBoard chats={this.state.msgs}/>
                   
                </div>
            </div>
        );
    }
}

export default Player;