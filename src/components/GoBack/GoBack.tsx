import React from 'react';
import { useLocation } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// style imports
import "./GoBack.css";

const GoBack:React.FunctionComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/");

  // eslint-disable-next-line no-restricted-globals
  const handleArrowClick = () => history.back();

  return currentPath.includes("home") ? null : (
    <div className="chevron-left-div" onClick={handleArrowClick}>
      <ChevronLeftIcon className="chevron-left-icon" />
    </div>
  );
};

export default GoBack;
