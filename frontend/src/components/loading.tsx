import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const LoadingComponent: React.FunctionComponent = ({}) => {
  return (
    <div className="container">
      <p className=" center">loading</p>
    </div>
  );
};
