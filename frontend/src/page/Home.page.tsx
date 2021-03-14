import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { PublicTestDataListe } from "./../components/home/publicTestDataListe";

interface ConnectedState {}

const mapStateToProps = (state: AppState) => ({});

export const HomeComponent: React.FC<ConnectedState> = () => {
  return <PublicTestDataListe />;
};

export const Home = connect(mapStateToProps)(HomeComponent);
