import React from "react";

import { connect } from "react-redux";
import { AppState } from "../../store/model";

import { NewTestData } from "./newTestData";
import { ListeTestData } from "./listeTestData";

import "./dashboard.css";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const AdminDashboardComponent: React.FC<ConnectedState> = ({}) => {
  return (
    <>
      <NewTestData /> <ListeTestData />
    </>
  );
};

export const AdminDashboard = connect(mapStateToProps)(AdminDashboardComponent);
