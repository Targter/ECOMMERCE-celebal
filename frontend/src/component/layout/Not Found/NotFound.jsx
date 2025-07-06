import React from "react";
// import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
// import { div } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      {/* <ErrorIcon /> */}

      <div>Page Not Found </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
