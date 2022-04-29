import React from "react";

const ValidationError = ({ children }) => {
  return <div className="errorMsg">{children}</div>;
};

export default ValidationError;
