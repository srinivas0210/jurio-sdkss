import React, { useEffect, useRef } from "react";

// external components and constants
import SvgProfile from "../../Assets/Profile";
import { constants } from "../../Constants";
import { getItem } from "../../Services/LocalStorage";

// Models
import Message from "../../Models/Message";

// style imports
import "./ChatBoxBody.css";

interface ChatBoxBodyProps {
  messages: Message[];
}

const ChatBoxBody: React.FunctionComponent<ChatBoxBodyProps> = ({
  messages,
}) => {
  const chatBoxBodyScrollRef = useRef<any>(null);
  const currentUserId: string = getItem("currentUserId") || "";

  const sortedMessages = messages?.length
    ? messages.sort((a: any, b: any) => a.id - b.id)
    : [];

  useEffect(() => {
    if (chatBoxBodyScrollRef && chatBoxBodyScrollRef.current) {
      chatBoxBodyScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages]);

  return (
    <div className="chat-box-body">
      {messages?.length ? (
        sortedMessages.map((message: Message) => {
          return (
            <div
              key={message.id}
              className={`message-container ${
                message.sender_id === JSON.parse(currentUserId)
                  ? "sender-container"
                  : "receiver-container"
              }`}
            >
              <div className={`message-box`}>
                <div className="message-avatar">
                  <SvgProfile rootClass="profile-avatar" color={"primary"} />
                </div>
                <div className="message-info">
                  <p className="message-text">{message.content}</p>
                  <p className="message-time">
                    {message.sender_id === JSON.parse(currentUserId)
                      ? "You"
                      : message.sender_name}
                    , 10: 27 pm
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-messages flex">{constants.noMessagesText}</div>
      )}
      <div ref={chatBoxBodyScrollRef}></div>
    </div>
  );
};

export default ChatBoxBody;
