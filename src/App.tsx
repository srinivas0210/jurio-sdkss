import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ActionCable } from "react-actioncable-provider";
import { useDispatch } from "react-redux";

// external components and constants
import { ROUTES } from "./Routes";
import Home from "./components/Home/Home";
import GoBack from "./components/GoBack/GoBack";
import ChatBox from "./components/ChatBox/ChatBox";
import { setWebSocketData } from "./Store/Actions/Actions";
import Conversations from "./components/Conversations/Conversations";
import PositionedSnackbar from "./components/SnackBarNotify/SnackBarNotify";
import CreateNewConversation from "./components/CreateNewConversation/CreateNewConversation";

// Models
import Notification from "./Models/Notification";

// style imports
import "./App.css";

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const currentUserId: string = localStorage.getItem("currentUserId") || "";

  const [notify, setNotify] = useState<boolean>(false);
  const [notificationMessageDetails, setNotificationMessageDetails] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (notify) {
      setTimeout(() => setNotify(false), 2000);
    }
  }, [notify]);

  const handleReceivedConversation = (payload: any) => {
    if (Number(payload.sender_id) != Number(JSON.parse(currentUserId))) {
      setNotify(true);
      setNotificationMessageDetails(payload);
      dispatch(setWebSocketData(payload));
    }
  };

  return (
    <>
      <ActionCable
        channel={{ channel: "NotificationsChannel" }}
        onReceived={handleReceivedConversation}
      >
        <div className="App">
          <PositionedSnackbar
            notify={notify}
            notificationMessageDetails={notificationMessageDetails}
          />
        </div>
      </ActionCable>
      <Switch>
        <Redirect exact from={"/"} to={ROUTES.HOME} />
        <Route component={Home} path={ROUTES.HOME} />
        <Route exact component={Conversations} path={ROUTES.CONVERSATIONS} />
        <Route component={ChatBox} path={ROUTES.CHAT_BOX} />
        <Route
          component={CreateNewConversation}
          path={ROUTES.CREATE_NEW_CONVERSATION}
        />
      </Switch>
      <GoBack />
    </>
  );
};

export default App;
