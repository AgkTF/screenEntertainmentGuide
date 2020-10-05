import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = ({ size }) => {
  return <FontAwesomeIcon icon={faSpinner} spin size={size} />;
};

export default Spinner;
