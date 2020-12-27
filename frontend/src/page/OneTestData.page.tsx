import React from "react";
import { AppState } from "../store/model";
import { connect } from "react-redux";
import { OneTestData } from "../components/OneTestData/OneTestData";
import { LoadingComponent } from "../components/loading";
import { TestData } from "../store/testData/testData.model";

interface ConnectedState {
  // admin?: boolean;
  // firstName?: String;
  oneTestDataArray: TestData;
}

const mapStateToProps = (state: AppState) => ({
  // admin: state.auth.admin,
  // firstName: state.auth.firstName,
  oneTestDataArray: state.testData.oneTestDataArray,
});

export const OneTestDataComponent: React.FC<ConnectedState> = ({
  oneTestDataArray,
}) => {
  // if (oneTestDataArray.name !== "") {
  //   return <OneTestData />;
  // }
  // return <LoadingComponent />;
  // return null;
  return <OneTestData />;
};

export const OneTestDataPage = connect(mapStateToProps)(OneTestDataComponent);
