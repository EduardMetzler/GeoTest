import React, { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "../../store/model";
import { testDataArrayLoading } from "../../store/testData/testData.actions";
import { NewTestData } from "./newTestData";

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
  // const [newTestDataName, setNewTestDataName] = useState("");

  // const dispatch = useDispatch();

  // const handleSubmit = (event: any) => {
  //   dispatch(newTestDataCreate(newTestDataName));
  //   event.preventDefault();
  // };

  // const checkData = () => {
  //   if (newTestDataName.length === 0) {
  //     return "btn waves-effect waves-light disabled";
  //   }
  //   return "btn waves-effect waves-light ";
  // };
  return (
    <div className="card">
      <div className="card-content">
        <table className="highlight">
          <tbody>
            {testDataArray.map((testData) => (
              <tr key={testData._id}>
                <td>
                  <Link to={`/one-test-data/${testData._id}`}>
                    <h5>{testData.name}</h5>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <ul className="highlight">
          {testDataArray.map((testData) => (
            <li key={testData.name}>
              <h5>{testData.name}</h5>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export const ListeTestData = connect(mapStateToProps)(ListeTestDataComponent);
