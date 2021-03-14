import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";

import { AdminDashboard } from "../components/dashboard/adminDashboard";
import { UserDashboard } from "../components/dashboard/userDashboard";
import { LoadingComponent } from "../components/loading";

interface ConnectedState {
  admin?: boolean;
  firstName?: String;
  error: String;
}

const mapStateToProps = (state: AppState) => ({
  admin: state.auth.admin,
  firstName: state.auth.firstName,
  error: state.error.message,
});

export const DashboardComponent: React.FC<ConnectedState> = ({
  admin,
  firstName,
}) => {
  if (firstName && admin !== true) {
    return <UserDashboard />;
  }
  if (firstName && admin === true) {
    return <AdminDashboard />;
  }

  return <LoadingComponent />;
};

export const DashboardPage = connect(mapStateToProps)(DashboardComponent);
