import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { OneTestData } from "../components/OneTestData/OneTestData";

import { TestData } from "../store/testData/testData.model";

interface ConnectedState {
  admin?: boolean;

  oneTestDataArray: TestData;
}

const mapStateToProps = (state: AppState) => ({
  admin: state.auth.admin,

  oneTestDataArray: state.testData.oneTestDataArray,
});

export const OneTestDataComponent: React.FC<ConnectedState> = ({}) => {
  return <OneTestData />;
};

export const OneTestDataPage = connect(mapStateToProps)(OneTestDataComponent);
