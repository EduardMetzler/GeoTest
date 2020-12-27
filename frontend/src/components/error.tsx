import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const ErrorComponent: React.FunctionComponent = ({}) => {
  return (
    <div className="container">
      <p className=" center">error 404</p>
    </div>
  );
};
