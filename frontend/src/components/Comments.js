import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Comment from "./Comment";

const Comments = React.memo(({ messages, timeline }) => {
  if (!messages || messages.length === 0) messages = [];
  console.log(`INFO (Comments.js) : 현재 전체 댓글 갯수 : ${messages.length}`);

  // 보여줘야 하는 것만 보여줌.
  // ChatContainer.js에서 1차적으로 시간에 따라 정렬하고(+필터링), 여기서는 그것을 '언제' 보여주느냐를 결정함(필터링)
  const filteredMessages = messages.filter((message) => message.timeline <= timeline);
  return (
    <ScrollToBottom>
      {filteredMessages.map((message, i) => (
        <div key={i}>
          {/* TODO: 의미있는 key를 사용해야 함. DB insert에 대한 result가 필요할 듯 */}
          <Comment message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
});

export default Comments;
