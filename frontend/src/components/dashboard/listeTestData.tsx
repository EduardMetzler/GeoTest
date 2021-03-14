import React from "react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "../../store/model";
import { testDataArrayLoading } from "../../store/testData/testData.actions";

import "./dashboard.css";
import { TestData } from "../../store/testData/testData.model";
import { Link } from "react-router-dom";

interface ConnectedState {
  testDataArray: TestData[];
}

const mapStateToProps = (state: AppState) => ({
  testDataArray: state.testData.testDataArray,
});

export const ListeTestDataComponent: React.FC<ConnectedState> = ({
  testDataArray,
}) => {
  const dispatch = useDispatch();
  if (testDataArray.length === 0) {
    dispatch(testDataArrayLoading());
  }

  return (
    <>
      <div className="card">
        <div className="card-content">
          <h5>Veröffentlicht</h5>
          <table className="highlight">
            <tbody>
              {testDataArray.map((testData) => (
                <tr key={testData._id}>
                  {testData.publicStatus && (
                    <td>
                      <Link to={`/one-test-data/${testData._id}`}>
                        <h5>{testData.name}</h5>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h5>Nicht veröffentlicht</h5>
          <table className="highlight">
            <tbody>
              {testDataArray.map((testData) => (
                <tr key={testData._id}>
                  {!testData.publicStatus && (
                    <td>
                      <Link to={`/one-test-data/${testData._id}`}>
                        <h5>{testData.name}</h5>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const ListeTestData = connect(mapStateToProps)(ListeTestDataComponent);
