import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/model";
import { testClear } from "../../store/test/test.actions";
import { TestStore } from "../../store/test/test.model";
import { testDataSelectArrayLoading } from "../../store/testData/testData.actions";
import { TestData } from "../../store/testData/testData.model";
import { LoadingComponent } from "../loading";

interface OwnProps {}

interface ConnectedState {
  testDataNamenArray: TestData[];
  test: TestStore;
  testDataNamenArrayLoaded: boolean;
}

const mapStateToProps = (state: AppState) => ({
  testDataNamenArray: state.testData.testDataNamenArray,
  test: state.test,
  testDataNamenArrayLoaded: state.testData.testDataNamenArrayLoaded,
});

const PublicTestDataListeComponent: React.FunctionComponent<
  ConnectedState & OwnProps
> = ({ testDataNamenArray, test, testDataNamenArrayLoaded }) => {
  const dispatch = useDispatch();

  if (test.name !== "") {
    setTimeout(() => {
      dispatch(testClear());
    }, 0);
  }
  if (!testDataNamenArrayLoaded) {
    dispatch(testDataSelectArrayLoading());
  }
  return (
    // <div></div>
    <div>
      {testDataNamenArrayLoaded ? (
        <div className="card">
          <div className="card-content">
            <h5>Alle Testen</h5>
            {testDataNamenArray.length === 0 ? (
              <h3 style={{ color: "grey" }}>Keine Test</h3>
            ) : (
              <table className="highlight">
                <tbody>
                  {testDataNamenArray.map((testData) => (
                    <tr key={testData._id}>
                      {testData.publicStatus && (
                        <td>
                          <Link to={`/testStart/${testData._id}`}>
                            <h5>{testData.name}</h5>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export const PublicTestDataListe = connect(mapStateToProps)(
  PublicTestDataListeComponent
);
