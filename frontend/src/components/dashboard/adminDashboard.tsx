import React, { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "../../store/model";
import { newTestDataCreate } from "../../store/testData/testData.actions";
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
