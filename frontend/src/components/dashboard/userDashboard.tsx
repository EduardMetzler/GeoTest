import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store/model";
import { AllMyTests } from "./allMyTests";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const userDashboardComponent: React.FC<ConnectedState> = ({}) => {
  return <AllMyTests />;
};

export const UserDashboard = connect(mapStateToProps)(userDashboardComponent);
