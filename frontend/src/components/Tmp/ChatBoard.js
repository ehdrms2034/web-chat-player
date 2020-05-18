import React, { Component } from 'react'
import ChatComponent from './Chat';
class ChatBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    //react life cycle. react에서는 기본적으로 상태가 뭐든 바뀌면 rerender하게 되어있는데,
    //[1,2] -> [1,2,3] 으로 바뀌더라도 3만 다시 render하기 위해 있는 부분
    //nextProps가 incoming change, 그냥 this.props가 현재 상태  
    //현재 이 child가 2번씩 처리되는데 아직 문제를 찾지 못한 상태 
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.chats !== nextProps.chats) {
            console.log("new chat to render");
            return true;
        }
        else {
            //console.log("not now");
            return false;
        }
    }
    render() {
        //map 안에서 each chat의 컴포넌트 부르기
        const eachChat = this.props.chats.map(
            x => (
                //uid={x.id} 면 props인 ChatComponent에서 부를 때는 props.uid로 부를 수 있음 
                <ChatComponent 
                  key={new Date().getTime()+x.message}
                  uid={x.id}
                    msg={x.message}
                    createdAt={x.createdAt}
                    timeline={x.timeline}                
                />
            )
        );
        return (
            <div>
                {eachChat}
            </div>
        )
    }
}

export default ChatBoard
