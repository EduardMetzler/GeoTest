import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const HomeComponent: React.FC<ConnectedState> = ({}) => {
  return <div>Home site</div>;
};

export const Home = connect(mapStateToProps)(HomeComponent);
