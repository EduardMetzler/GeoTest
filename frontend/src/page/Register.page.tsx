import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";

import { Register } from "../components/register/register";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const RegisterComponent: React.FC<ConnectedState> = ({}) => {
  return <Register />;
};

export const RegisterPage = connect(mapStateToProps)(RegisterComponent);
