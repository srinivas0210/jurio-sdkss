import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// external components and constants
import { ROUTES } from "../../Routes";

// style imports
import "./GoBack.css";

const GoBack: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname.split("/");

  const handleArrowClick = () => {
    if (location.pathname.includes("/conversations/")) {
      history.push(ROUTES.CONVERSATIONS);
    }else if(location.pathname.includes(ROUTES.CONVERSATIONS)) {
      history.push(ROUTES.HOME);
    }  else {
      // eslint-disable-next-line no-restricted-globals
      history.goBack()
    }
  };

  return currentPath.includes("home") ? null : (
    <div className="chevron-left-div" onClick={handleArrowClick}>
      <ChevronLeftIcon className="chevron-left-icon" />
    </div>
  );
};

export default GoBack;
