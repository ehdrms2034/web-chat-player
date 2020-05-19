import React, { useState, useEffect } from 'react';
import ChatComponent from './Chat';

const ChatList = (props) => {
    const chats = props.chats.map(
        x =>  (
            //uid={x.id} 면 props인 ChatComponent에서 부를 때는 props.uid로 부를 수 있음 
            <ChatComponent 
              uid={x.id}
                msg={x.message}
                createdAt={x.createdAt}
                timeline={x.timeline}                
            />
        )
    );
    return <div>{chats}</div>
}

export default ChatList;