import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import socketio from 'socket.io-client';
import ChatBoard from './ChatBoard'; //chat들을 렌더링할 list component
const socketServerURL = "ws://49.50.173.151:3000"; // websocket server(server 003)

class Player extends Component {
  constructor(props) {
    super(props);
    //init states and client(socket)
    this.client=null;
    this.state = {
        msgs: [],
        movie: "example"
    };
}

    //TmpSieun 의 Player 컴포넌트가 처음 그려진 직후에 소켓 연결을 딱 한번 하기 
    componentDidMount() {
      this.establishConnection();
    }

    //react-player code
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

    //make connection: handshake, http->websocket upgrade 단계
    establishConnection() {
      //transports option이 없으면 http polling으로 되고,
      //upgrade: false가 없으면 connect/disconnect를 계속 반복하더라구요
      this.client = socketio.connect(socketServerURL, { transports: ['websocket'], upgrade: false });
      console.log("made connection");

      //server에게서 온 msg 처리
      this.client.on('newMessage', (data)=> {
        //불변성을 유지해야, 리액트에서 모든것들이 필요한 상황에 리렌더링 되도록 설계 할 수 있고
        //그렇게 해야 나중에 성능도 최적화 할 수 있기 때문에(https://velopert.com/3636)
        //state를 state 기반으로 갱신할 때는 새로 만들어줘야 하는데
        //A.concat(B) --> A 배열에 B를 추가한 버전으로 새로운 배열을 만듬
        //이 새로운 배열을 다시 msgs state에 넣어줍니다
        this.setState({
            msgs : this.state.msgs.concat(data)
        });
      });
    }

    //change를 부른 e.target input의 name 자체가 state 이름이 되고, 그 input 속의 value가 state의 value가 됩니다
    handleChange=(e)=> {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    //새로운 댓글을 달 때. 형식은 맞춰줘야 하고 value는 일단 아무거나 넣었습니다
    sendMsg = () => {
      this.client.emit('newComment', {id: "example-id", message:this.state.clientMsg, createdAt: new Date(), timeline:"11:11:11", video:this.state.roomName});
      //댓글 send 하면 비워주기
      this.setState({
        clientMsg: ''
      });
    }

    //roomName 을 기반으로 same video room에 있다고 보면 되고, .emit('규칙', content)입니다
    //지금은 임시로 구현했지만 나중에는 영상을 보러 왔을때 처음 한번만 호출하면 되며
    //영상 메타 api로 가져온 영상 식별자가 content에 들어가면 됩니다
    //'join'으로 보내면 서버에서 join 해주기로 약속
    //join 이후로는 서버가 join해있는 방에 해당되는 메시지들을 보냄 
    joinRoom=()=> {
      this.client.emit('join', this.state.roomName);
    }
    render() {
     
        return (
            <div>
                 <ReactPlayer
                 ref={this.ref}
                 url={"http://49.50.162.195:8080/videos/whatsuda.m3u8"} playing
                 onReady={this.onPlayerReady}
                 />

                 {/* 임시로 구현. 테스트할때는 한번만 눌러주고, 탭을 여러개 켜서 같은 이름으로 조인*/}
                <input onChange={this.handleChange} name="roomName"/>                 
                 <button onClick={this.joinRoom}>채팅방조인</button>
                 
                 <input onChange={this.handleChange} name="clientMsg"/>
                 <button onClick={this.sendMsg}>메시지보내기</button>
                <div>
                  {/* list view에 대응되는 채팅 컨테이너에게 받을 때 마다 추가해둔 msgs를 넘김.
                  state - props로 묶여있으므로 따로 처리하지 않아도 state가 변하면 props에서 변화가 감지됨 */}
                  <ChatBoard chats={this.state.msgs}/>
                   
                </div>
            </div>
        );
    }
}

export default Player;