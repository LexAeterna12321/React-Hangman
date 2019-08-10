import React from "react";
import PropTypes from "prop-types";

const Image = ({ images, nWrong }) => {
  return <img src={images[nWrong]} alt={`${nWrong} wrong guesses`} />;
};

Image.propTypes = {
  images: PropTypes.array.isRequired,
  nWrong: PropTypes.number.isRequired
};

export default Image;
