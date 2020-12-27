import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/model";

interface ConnectedState {
  //   isAuthenticated: boolean;
  //   firstName: String;
  //   token?: String | null;
}

const mapStateToProps = (state: AppState) => ({
  //   isAuthenticated: state.auth.isAuthenticated,
  //   firstName: state.auth.firstName,
  //   token: state.auth.token,
});

export const userDashboardComponent: React.FC<ConnectedState> = ({}) => {
  return <div>user</div>;
};

export const UserDashboard = connect(mapStateToProps)(userDashboardComponent);
