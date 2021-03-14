import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { OneTest } from "../components/oneTest/oneTest";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const OneTestComponent: React.FC<ConnectedState> = ({}) => {
  return <OneTest />;
};

export const OneTestPage = connect(mapStateToProps)(OneTestComponent);
