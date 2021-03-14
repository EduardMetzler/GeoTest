import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { myNewTest } from "../../store/auth/auth.actions";
import { myTestCreate, testClear } from "../../store/test/test.actions";
import { TestData } from "../../store/testData/testData.model";
import { ErrorComponent } from "../error";
import { testDataSelectArrayLoading } from "../../store/testData/testData.actions";
import { LoadingComponent } from "../loading";
import { TestStore } from "../../store/test/test.model";

interface ConnectedState {
  testId: String | undefined;
  testDataNamenArray: TestData[];
  testDataOwner: String;
  error: String;
  test: TestStore;
}

const mapStateToProps = (state: AppState) => ({
  testId: state.test._id,
  testDataNamenArray: state.testData.testDataNamenArray,
  testDataOwner: state.test.testDataOwner,
  error: state.test.error,
  test: state.test,
});

export const TestStartComponent: React.FC<ConnectedState> = ({
  testId,
  testDataNamenArray,

  test,
}) => {
  const { oneTestDataId }: any = useParams();

  const [loading, setLoading] = useState(false);
  const [testName, setTestName] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  if (test.start) {
    setTimeout(() => {
      dispatch(testClear());
    }, 0);
  }

  const startClick = () => {
    history.push(`/one-test/${testId}`);
    dispatch(myNewTest(test._id, test.name));
  };

  if (testDataNamenArray.length === 0) {
    dispatch(testDataSelectArrayLoading());
  }

  if (testDataNamenArray.length !== 0 && testName === "") {
    const testNameFound: any = testDataNamenArray.find((item) => {
      return item._id === oneTestDataId;
    });

    if (testNameFound) {
      setTestName(testNameFound.name);
    }
  }

  const createClick = () => {
    setLoading(true);
    dispatch(myTestCreate(oneTestDataId));
  };

  const loadingIsTrue = () => {
    if (loading) {
      return "waves-effect   darken-1 btn-small  disabled styleAddButton";
    }
    return "waves-effect  darken-1 btn-small styleAddButton";
  };

  return (
    <div className="row">
      <div className="col s12 m12  l12  xl8 " style={{ height: "20vh" }}></div>

      {testDataNamenArray.length === 0 ? (
        <LoadingComponent />
      ) : (
        <div>
          {" "}
          {testDataNamenArray.length !== 0 && testName === "" ? (
            <ErrorComponent />
          ) : (
            <div className="center ">
              <h3>{testName}</h3>
              {testId === "" ? (
                <button
                  type="button"
                  className={loadingIsTrue()}
                  onClick={createClick}
                >
                  erstellen
                </button>
              ) : (
                <button
                  type="button"
                  className={"waves-effect  darken-1 btn-small styleAddButton"}
                  onClick={startClick}
                >
                  Start
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const TestStart = connect(mapStateToProps)(TestStartComponent);

// {error === "error 404" ? (
//   <ErrorComponent />
// ) : (
//   <div className="center ">
//     <h3>{testName}</h3>
//     {testId === "" ? (
//       <button
//         type="button"
//         className={loadingIsTrue()}
//         onClick={createClick}
//       >
//         erstellen
//       </button>
//     ) : (
//       <button
//         type="button"
//         className={"waves-effect  darken-1 btn-small styleAddButton"}
//         onClick={startClick}
//       >
//         Start
//       </button>
//     )}
//   </div>
// )}

// return (
//   <div className="row">
//     <div className="col s12 m12  l12  xl8 " style={{ height: "20vh" }}></div>

//     {error === "error 404" ? (
//       <ErrorComponent />
//     ) : (
//       <div>
//         {testDataNamenArray.length === 0 ? (
//           <LoadingComponent />
//         ) : (
//           <div className="center ">
//             <h3>{testName}</h3>
//             {testId === "" ? (
//               <button
//                 type="button"
//                 className={loadingIsTrue()}
//                 onClick={createClick}
//               >
//                 erstellen
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 className={"waves-effect  darken-1 btn-small styleAddButton"}
//                 onClick={startClick}
//               >
//                 Start
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     )
//     }
//   </div>
// );

// return (
//   <div className="row">
//     <div className="col s12 m12  l12  xl8 " style={{ height: "20vh" }}></div>

//     {error === "error 404" ? (
//       <ErrorComponent />
//     ) : (
//       <div className="center ">
//         <h3>{testName}</h3>
//         {testId === "" ? (
//           <button
//             type="button"
//             className={loadingIsTrue()}
//             onClick={createClick}
//           >
//             erstellen
//           </button>
//         ) : (
//           <button
//             type="button"
//             className={"waves-effect  darken-1 btn-small styleAddButton"}
//             onClick={startClick}
//           >
//             Start
//           </button>
//         )}
//       </div>
//     )}
//   </div>
// );
