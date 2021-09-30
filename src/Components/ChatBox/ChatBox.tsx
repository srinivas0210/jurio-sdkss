import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@material-ui/core";

// external components and constants
import ChatBoxBody from "../ChatBoxBody/ChatBoxBody";
import { constants } from "../../Constants";
import { getOrPostMessages } from "../../Services/Messages";

// / Models
import State from "../../Models/State";

// style imports
import "./ChatBox.css";

const ChatBox: React.FunctionComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const currentUserId: string = localStorage.getItem("currentUserId") || "";
  const currentConvoTitle: string =
    localStorage.getItem("currentConvoTitle") || "";

  const webSocketData = useSelector((state: State) => state.webSocketData);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [fetchAgain, setFetchAgain] = useState<boolean>(true);

  useEffect(() => {
    if (
      fetchAgain ||
      webSocketData.conversation_id ===
        Number(currentPath[currentPath.length - 1])
    ) {
      const requestOptions: any = {
        headers: { user_id: JSON.parse(currentUserId) },
      };

      getOrPostMessages(
        currentPath[currentPath.length - 1],
        requestOptions
      ).then((currentMessages) => {
        if (currentMessages[0] !== messages[0]) setMessages(currentMessages);
      });
      setFetchAgain(false);
    }
  }, [fetchAgain, webSocketData]);

  const sendMessage = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      if (!newMessage) {
        alert(constants.errorMessageNeeded);
        return;
      }
      const requestOptions: any = {
        method: "POST",
        headers: {
          user_id: JSON.parse(currentUserId),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage }),
      };

      getOrPostMessages(currentPath[currentPath.length - 1], requestOptions);

      setTimeout(() => setFetchAgain(true), 500);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-box flex">
      <div className="chat-box-header">{JSON.parse(currentConvoTitle)}</div>
      <ChatBoxBody messages={messages} />
      <div className="chat-box-footer flex">
        <TextField
          className="chat-input"
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder={constants.chatInputPlaceHolder}
          variant="filled"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => sendMessage(e)}
        />
      </div>
    </div>
  );
};

export default ChatBox;
