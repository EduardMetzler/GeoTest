import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";

import { Login } from "../components/login/login";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const LoginComponent: React.FC<ConnectedState> = ({}) => {
  return <Login />;
};

export const LoginPage = connect(mapStateToProps)(LoginComponent);
