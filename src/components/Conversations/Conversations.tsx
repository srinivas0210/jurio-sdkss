import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// external components and constants
import {
  setConversations,
  setCurrentConversation,
} from "../../store/Actions/Actions";
import SvgProfile from "../../assets/Profile";
import { constants } from "../../constants";
import FloatButton from "../FloatButton/FloatButton";
import { getOrPostConversations } from "../../services/Conversations";
import { setItem,getItem } from "../../services/LocalStorage";

// Models
import State from "../../models/State";

// style imports
import "./Conversations.css";

const Conversations = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUserId: string = getItem("currentUserId") || "";
  const currentUserConversations = useSelector(
    (state: State) => state.conversations
  );

  useEffect(() => {
    const requestOptions: any = {
      headers: { user_id: JSON.parse(currentUserId) },
    };
    getOrPostConversations(requestOptions).then((convos) =>
      dispatch(setConversations(convos))
    );
  }, []);

  const redirectToMessages = (convo: any) => {
    dispatch(setCurrentConversation(convo));
    setItem("currentConvoTitle", JSON.stringify(convo.title));
    history.push(`/conversations/${convo.id}`);
  };

  return (
    <div className="Conversations flex">
      <div className="header-div flex">
        <div className="title">{constants.yourConversationsText}</div>
      </div>
      <div className="convos-list-outer-div">
        <div className="convos-list-inner-div">
          {currentUserConversations.length
            ? currentUserConversations.map((convo: any) => {
                return (
                  <div
                    className="convo-item flex"
                    onClick={() => redirectToMessages(convo)}
                  >
                    <div className="avatar flex">
                      <div className="avatar-inner-div">
                        <SvgProfile
                          rootClass="profile-avatar"
                          color={"primary"}
                        />
                      </div>
                    </div>

                    <div className="name">
                      {convo.title}
                      <div className="recent-message flex">
                        <div>
                          {convo.last_message?.length
                            ? convo.last_message[0].content
                            : "No recent Messages"}
                        </div>
                        <div>{convo.updated_at?.slice(11, 16)} </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <FloatButton
        text={constants.newConversationText}
        handleClick={() => history.push("/create-new-conversation")}
      />
    </div>
  );
};

export default Conversations;
