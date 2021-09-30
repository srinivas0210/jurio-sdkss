const initialState = {
  currentUser: {},
  contacts: [],
  conversations: [],
  currentConversationDetails: {},
  webSocketData: {}
};

const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload,
      };
    case "SET_CURRENT_CONVERSATION":
      return {
        ...state,
        currentConversationDetails: action.payload,
      };
      case "SET_WEB_SOCKET_DATA":
      return {
        ...state,
        webSocketData: action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
