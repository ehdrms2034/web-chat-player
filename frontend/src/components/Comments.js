import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Comment from './Comment';

const Comments = ({messages}) => (
    <ScrollToBottom>
        {messages.map((message, i) => 
            <div key={i}>
                <Comment message={message} />
            </div>
        )}
    </ScrollToBottom>
);

export default Comments;