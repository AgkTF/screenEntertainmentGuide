import React from "react";
import PropTypes from "prop-types";
import classes from "./Image.module.css";

const Image = ({ url, altText }) => {
  return (
    <img
      className={`relative w-full h-full object-cover ${classes.Image}`}
      loading="lazy"
      src={url}
      alt={altText}
    />
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default Image;
