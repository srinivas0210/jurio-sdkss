import React from "react";

interface FloatButtonProps {
  text: string;
  handleClick(param: any): void;
}

const FloatButton: React.FunctionComponent<FloatButtonProps> = ({
  text,
  handleClick,
}) => {
  return (
    <div className="home-continue" onClick={handleClick}>
      {text}
    </div>
  );
};

export default FloatButton;
