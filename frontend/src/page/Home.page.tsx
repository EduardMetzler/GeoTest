import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { clearErrors } from "../store/error/error.actions";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const HomeComponent: React.FC<ConnectedState> = ({}) => {
  // clearErrors();

  return <div>Home site</div>;
};

export const Home = connect(mapStateToProps)(HomeComponent);
