import React, { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "../../store/model";
import { useHistory, useParams } from "react-router-dom";
import { TestData } from "../../store/testData/testData.model";

import {
  clearMessage,
  loadingStatus,
  oneTestDataArrayLoading,
  oneTestDataDelete,
  oneTestDataUpdate,
  questionDelete,
  testDataPublicStatus,
} from "../../store/testData/testData.actions";

import { LoadingComponent } from "../loading";
import "./OneTestData.css";

import { ErrorComponent } from "../error";

interface ConnectedState {
  oneTestDataArray: TestData;
  loading: boolean;
  message: string;
  error: String;
}

const mapStateToProps = (state: AppState) => ({
  oneTestDataArray: state.testData.oneTestDataArray,
  loading: state.testData.loading,
  message: state.testData.message,
  error: state.error.message,
});

export const OneTestDataComponent: React.FC<ConnectedState> = ({
  oneTestDataArray,
  loading,
  message,
  error,
}) => {
  // const { oneTestDataId } = useParams<ConnectedState>();
  const { oneTestDataId }: any = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const [testData, setTestData] = useState({
    name: "",
    _id: "",
    texts: [{ question: "", correctAnswer: "", _id: "" }],
    publicStatus: false,
  });

  if (message === "TestData ist Gelöscht") {
    setTimeout(() => {
      history.push("/dashboard");
    }, 0);
  }

  if (oneTestDataArray.name === "" || oneTestDataArray._id !== oneTestDataId) {
    dispatch(oneTestDataArrayLoading(oneTestDataId));
  }

  if (
    (message === "loaded" &&
      testData.name === "" &&
      oneTestDataArray._id !== "") ||
    (message === "loaded" &&
      JSON.stringify(testData) !== JSON.stringify(oneTestDataArray))
  ) {
    const one = JSON.parse(JSON.stringify(oneTestDataArray));
    setTestData(one);
  }

  if (message === "loaded") {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 0);
  }

  const handleChange = (i: any) => (event: any) => {
    event.preventDefault();

    const name = event.target.name;

    let newText = [...testData.texts];

    if (name === "question") {
      newText[i].question = event.target.value;
    } else {
      newText[i].correctAnswer = event.target.value;
    }

    setTestData({
      ...testData,
      texts: newText,
    });
  };

  const addNewQuestion = () => {
    const newText = [
      ...testData.texts,
      { question: "", correctAnswer: "", _id: "" },
    ];
    setTestData({
      ...testData,
      texts: newText,
    });
  };

  const oneQuestionDelete = (id: any, i: any, oneTestDataId: any) => {
    const newText = [
      ...testData.texts.filter((item, index) => {
        return i === index ? null : item;
      }),
    ];
    setTestData({
      ...testData,
      texts: newText,
    });
  };

  const testDataDelete = () => {
    dispatch(oneTestDataDelete(oneTestDataId));
  };

  const deleteButtonCheckwithId = () => {
    const questionIsApproved = testData.texts.filter(
      (item: any, index: any) => {
        return testData.texts.indexOf(item) === index && item._id !== "";
      }
    );

    if (questionIsApproved.length < 5 || loading) {
      return "waves-effect waves-light btn-small disabled";
    }

    return "waves-effect waves-light btn-small ";
  };

  const deleteButtonCheckwithoutId = () => {
    if (loading) {
      return "waves-effect waves-light btn-small disabled";
    }
    return "waves-effect waves-light btn-small ";
  };

  const checkResetButton = () => {
    if (
      JSON.stringify(testData) === JSON.stringify(oneTestDataArray) ||
      loading
    ) {
      return "waves-effect waves-light btn-small disabled";
    }
    return "waves-effect waves-light btn-small";
  };

  const resetToOld = () => {
    const one = JSON.parse(JSON.stringify(oneTestDataArray));
    setTestData(one);
  };

  const checkData = () => {
    var map1: any = [];

    testData.texts.filter((item, index) => {
      map1.push(item.question);
    });

    var map2: any = [];

    testData.texts.filter((item, index) => {
      map2.push(item.correctAnswer);
    });

    const map22 = map2.filter((item: any, index: any) => {
      return map2.indexOf(item) === index;
    });

    const map11 = map1.filter((item: any, index: any) => {
      return map1.indexOf(item) === index;
    });

    const isEmpty = testData.texts.filter((e) => {
      return e.correctAnswer === "" || e.question === "";
    });

    if (
      isEmpty.length > 0 ||
      map22.length < map2.length ||
      map11.length < map1.length ||
      JSON.stringify(testData) === JSON.stringify(oneTestDataArray) ||
      loading
    ) {
      return "waves-effect   darken-1 btn-small  disabled styleAddButton";
    }

    return "waves-effect  darken-1 btn-small styleAddButton";
  };

  const publicStatusChange = (newStatus: boolean) => {
    dispatch(loadingStatus(true));

    dispatch(testDataPublicStatus(newStatus, oneTestDataId));

    console.log("public", newStatus);
  };

  const publicStatusButtonCheck = () => {
    const isEmpty = testData.texts.filter((e) => {
      return e.correctAnswer === "" || e.question === "";
    });
    if (
      JSON.stringify(testData) !== JSON.stringify(oneTestDataArray) ||
      isEmpty.length > 0 ||
      loading
    ) {
      return "waves-effect   darken-1 btn-small  disabled styleAddButton";
    }
    return "waves-effect  darken-1 btn-small styleAddButton";
  };

  const loadingIsTrue = () => {
    if (loading) {
      return "waves-effect   darken-1 btn-small  disabled styleAddButton";
    }
    return "waves-effect  darken-1 btn-small styleAddButton";
  };

  const handleSubmit = (event: any) => {
    console.log(testData);
    dispatch(loadingStatus(true));
    event.preventDefault();
    oneTestDataArray.texts.forEach((item) => {
      const found = testData.texts.find((element) => element._id === item._id);
      if (found === undefined) {
        dispatch(questionDelete(item._id, oneTestDataId));
      }
    });

    dispatch(oneTestDataUpdate(testData, oneTestDataId));
  };

  if (message === "loaded") {
    console.log("setTimeout(() ");
    setTimeout(() => {
      dispatch(clearMessage());
    }, 0);
  }

  return (
    <>
      {error === "error 404" ? (
        <ErrorComponent />
      ) : (
        <div>
          {oneTestDataArray.name ? (
            <>
              <div className="card orange darken-1  styleCard">
                {testData.name}
              </div>
              <form onSubmit={handleSubmit}>
                {testData.texts.map((item, i) => {
                  return (
                    <div key={i} className="card   styleCard">
                      <label>
                        Frage:
                        <input
                          type="text"
                          name="question"
                          value={item.question}
                          onChange={handleChange(i)}
                        />
                      </label>
                      <label>
                        Richtige Antwort:
                        <input
                          type="text"
                          name="correctAnswer"
                          value={item.correctAnswer}
                          onChange={handleChange(i)}
                        />
                      </label>
                      {item._id !== "" ? (
                        <button
                          type="button"
                          className={deleteButtonCheckwithId()}
                          onClick={() =>
                            oneQuestionDelete(item._id, i, oneTestDataId)
                          }
                        >
                          Löschen
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={deleteButtonCheckwithoutId()}
                          onClick={() =>
                            oneQuestionDelete(item._id, i, oneTestDataId)
                          }
                        >
                          Löschen
                        </button>
                      )}
                    </div>
                  );
                })}

                <button className={checkData()} type="submit">
                  Speichern
                </button>

                <button
                  type="button"
                  className={loadingIsTrue()}
                  onClick={addNewQuestion}
                >
                  Hinzufügen
                </button>
                <button
                  type="button"
                  className={checkResetButton()}
                  onClick={resetToOld}
                >
                  Zurücksetzen
                </button>
                <button
                  type="button"
                  className={loadingIsTrue()}
                  onClick={testDataDelete}
                >
                  Test löschen
                </button>
                <div>
                  {oneTestDataArray.publicStatus ? (
                    <button
                      type="button"
                      className={publicStatusButtonCheck()}
                      onClick={() => publicStatusChange(false)}
                    >
                      Verbergen
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={publicStatusButtonCheck()}
                      onClick={() => publicStatusChange(true)}
                    >
                      Veröffentlichen
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <LoadingComponent />
          )}
        </div>
      )}
    </>
  );
};

export const OneTestData = connect(mapStateToProps)(OneTestDataComponent);
