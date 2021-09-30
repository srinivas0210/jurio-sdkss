import { CurrentUser } from "./CurrentUser";
import Contact from "./Contact";
import { Conversation } from "./Conversation";
import { CurrentConversation } from "./CurrentConversation";
import WebSocketData from "./WebSocketData";

export default interface State {
  currentUser: CurrentUser;
  contacts: Contact[];
  conversations: Conversation[];
  currentConversationDetails: CurrentConversation;
  webSocketData: WebSocketData
}

