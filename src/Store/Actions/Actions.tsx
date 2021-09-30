import Contact from "../../Models/Contact";
import { CurrentUser } from "../../Models/CurrentUser";
import { Conversation } from "../../Models/Conversation";
import { CurrentConversation } from "../../Models/CurrentConversation";

const setContacts = (payload: Contact[]) => {
  return {
    type: "SET_CONTACTS",
    payload,
  };
};

const setCurrentUser = (payload: CurrentUser) => {
  return {
    type: "SET_CURRENT_USER",
    payload,
  };
};

const setConversations = (payload: Conversation[]) => {
  return {
    type: "SET_CONVERSATIONS",
    payload,
  };
};

const setCurrentConversation = (payload: CurrentConversation) => {
  return {
    type: "SET_CURRENT_CONVERSATION",
    payload,
  };
};

const setWebSocketData = (payload: any) => {
  return {
    type: "SET_WEB_SOCKET_DATA",
    payload,
  };
};

export {
  setContacts,
  setCurrentUser,
  setConversations,
  setCurrentConversation,
  setWebSocketData,
};
