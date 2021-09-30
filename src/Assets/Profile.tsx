import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

interface IProps {
  color: "primary";
  rootClass: string;
}

const SvgProfile = (props: IProps) => (
  <SvgIcon
    classes={{ root: props.rootClass }}
    viewBox="0 0 36 36"
    color={props.color}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      d="M1.333 34.667c0-6.25 8.334-6.25 12.5-10.417 2.084-2.083-4.166-2.083-4.166-12.5 0-6.944 2.777-10.417 8.333-10.417s8.333 3.473 8.333 10.417c0 10.417-6.25 10.417-4.166 12.5 4.166 4.167 12.5 4.167 12.5 10.417"
    />
  </SvgIcon>
);

export default SvgProfile;
