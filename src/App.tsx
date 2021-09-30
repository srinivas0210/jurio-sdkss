import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ActionCable from "actioncable";
import { useDispatch } from "react-redux";
import { webSocketUrl } from "./constants";

// external components and constants
import { ROUTES } from "./Routes";
import Home from "./components/Home/Home";
import GoBack from "./components/GoBack/GoBack";
import ChatBox from "./components/ChatBox/ChatBox";
import { setWebSocketData } from "./store/Actions/Actions";
import Conversations from "./components/Conversations/Conversations";
import PositionedSnackbar from "./components/SnackBarNotify/SnackBarNotify";
import CreateNewConversation from "./components/CreateNewConversation/CreateNewConversation";
import { getItem } from "./services/LocalStorage";

// Models
import Notification from "./models/Notification";

// style imports
import "./App.css";

const cable = ActionCable.createConsumer(`${webSocketUrl}`);

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const currentUserId: string = getItem("currentUserId") || "";

  const [notify, setNotify] = useState<boolean>(false);
  const [notificationMessageDetails, setNotificationMessageDetails] = useState<Notification | null>(null);

  const handleReceivedConversation = (payload: any) => {
    if (Number(payload.sender_id) != Number(JSON.parse(currentUserId))) {
      setNotify(true);
      setNotificationMessageDetails(payload);
      dispatch(setWebSocketData(payload));
    }
  };

  useEffect(() => {
    cable.subscriptions.create(
      { channel: "NotificationsChannel" },
      {
        received: handleReceivedConversation,
      }
    );
  }, []);

  useEffect(() => {
    if (notify) {
      setTimeout(() => setNotify(false), 2000);
    }
  }, [notify]);

  return (
    <>
      <div className="App">
        <PositionedSnackbar notify={notify} notificationMessageDetails={notificationMessageDetails} />
      </div>
      <Switch>
        <Redirect exact from={"/"} to={ROUTES.HOME} />
        <Route component={Home} path={ROUTES.HOME} />
        <Route exact component={Conversations} path={ROUTES.CONVERSATIONS} />
        <Route component={ChatBox} path={ROUTES.CHAT_BOX} />
        <Route component={CreateNewConversation} path={ROUTES.CREATE_NEW_CONVERSATION} />
      </Switch>
      <GoBack />
    </>
  );
};

export default App;
