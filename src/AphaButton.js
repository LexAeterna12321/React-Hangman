import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const AphaButton = ({ val, cb, isActive, clName }) => {
  const handleClick = e => {
    cb(e);
  };
  return (
    <button
      value={val}
      className={clName}
      onClick={handleClick}
      disabled={isActive}
    >
      {val}
    </button>
  );
};

AphaButton.propTypes = {
  val: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  clName: PropTypes.string
};

export default AphaButton;
