import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { TestStart } from "./../components/testStart/testStart";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const TestStartComponent: React.FC<ConnectedState> = ({}) => {
  return <TestStart />;
};

export const TestStartPage = connect(mapStateToProps)(TestStartComponent);
