import React, { Component } from 'react'
import ChatComponent from './Chat';
class ChatBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

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
        
        const eachChat = this.props.chats.map(
            x => (
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
