import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SvgProfile from "../../Assets/Profile";

// Models
import Notification from '../../Models/Notification'


interface PositionedSnackbarProps {
  notify: boolean;
  notificationMessageDetails: Notification | null;
}

const PositionedSnackbar: React.FunctionComponent<PositionedSnackbarProps> = ({
  notify,
  notificationMessageDetails,
}) => {

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={notify}
        onClose={() => null}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        style={{backgroundColor:'white !important'}}
        message={
          <div className='notification-main-div flex'>
            <div className="avatar flex">
              <div className="avatar-inner-div">
                <SvgProfile rootClass="profile-avatar" color={"primary"} />
              </div>
            </div>
            <div className='notification-info-div'>
              <div className='notification-info-sender'> 
                {notificationMessageDetails?.sender_name} Messaged In the group
              </div>
              <div>{notificationMessageDetails?.content}</div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default PositionedSnackbar;
