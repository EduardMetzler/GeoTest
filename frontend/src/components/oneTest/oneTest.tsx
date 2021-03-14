import React, { useState } from "react";

import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";

import { TestStore } from "../../store/test/test.model";
import {
  endStatusUpdate,
  myAnswersend,
  startStatusUpdate,
  testLoading,
} from "../../store/test/test.actions";
import { useHistory, useParams } from "react-router-dom";
import { ErrorComponent } from "../error";
import { LoadingComponent } from "../loading";
import { TestResult } from "./testResult";

interface ConnectedState {
  test: TestStore;
  error: String;
}

const mapStateToProps = (state: AppState) => ({
  test: state.test,
  error: state.test.error,
});

export const OneTestComponent: React.FC<ConnectedState> = ({ test, error }) => {
  const { testId }: any = useParams();
  const [hover, setHover] = useState("");
  const [currentEndStatus, setCurrentEndStatus] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState({
    allAnswer: [
      { answer: "", _id: "" },
      { answer: "", _id: "" },
      { answer: "", _id: "" },
      { answer: "", _id: "" },
    ],
    correctAnswer: "",
    question: "",
    _id: "",
    playerAnswer: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  if (test.name === "" && error === "") {
    dispatch(testLoading(testId));
  }

  if (test.name !== "" && !test.start) {
    setTimeout(() => {
      dispatch(startStatusUpdate(true, testId));
    }, 0);
  }

  if (currentQuestion._id === "" && test.name !== "") {
    const one: any = test.testTexts.find((item) => {
      return item.playerAnswer === "";
    });

    if (one !== undefined) {
      setCurrentQuestion(one);
    }
  }
  if (currentQuestion._id === "") {
  }

  const answerSelect = (answer: any, id: any) => {
    if (currentQuestion._id === test.testTexts[test.testTexts.length - 1]._id) {
      dispatch(endStatusUpdate(true));
    }
    if (currentQuestion.playerAnswer === "") {
      var allTexts = JSON.parse(JSON.stringify(test.testTexts));
      const newAllTexts = allTexts.map((item: any) => {
        if (id === item._id) {
          const newItem = {
            allAnswer: item.allAnswer,
            correctAnswer: item.correctAnswer,
            question: item.question,
            _id: item._id,
            playerAnswer: answer,
          };

          setCurrentQuestion(newItem);
          return newItem;
        } else return item;
      });

      dispatch(myAnswersend(newAllTexts, testId));
    }
  };

  const nextQuestion = () => {
    if (test.end === true) {
      setCurrentEndStatus(true);
    }
    const one: any = test.testTexts.find((item) => {
      return item.playerAnswer === "";
    });

    if (one !== undefined) {
      setCurrentQuestion(one);
    } else {
      setCurrentQuestion({
        allAnswer: [
          { answer: "", _id: "" },
          { answer: "", _id: "" },
          { answer: "", _id: "" },
          { answer: "", _id: "" },
        ],
        correctAnswer: "",
        question: "",
        _id: "",
        playerAnswer: "",
      });
    }
  };

  const checkAnswer = (answer: any) => {
    if (
      currentQuestion.playerAnswer !== "" &&
      answer.answer === currentQuestion.correctAnswer &&
      answer.answer === currentQuestion.playerAnswer
    ) {
      return "light-green accent-3 ";
    }
    if (
      currentQuestion.playerAnswer === "" &&
      hover &&
      answer.answer === hover
    ) {
      return "grey";
    }
    if (
      currentQuestion.playerAnswer !== "" &&
      answer.answer !== currentQuestion.correctAnswer &&
      answer.answer === currentQuestion.playerAnswer
    ) {
      return "red darken-2";
    }
    if (
      currentQuestion.playerAnswer !== "" &&
      answer.answer === currentQuestion.correctAnswer &&
      currentQuestion.correctAnswer !== currentQuestion.playerAnswer
    ) {
      return "yellow lighten-1";
    }
    return "grey lighten-2";
  };

  const checkNextQuestionButton = () => {
    if (currentQuestion.playerAnswer === "") {
      return "grey lighten- col s12 m12  l12 xl12 waves-effect darken-1 btn-small disabled";
    }

    return " lighten- col s12 m12  l12 xl12 waves-effect darken-1 btn-small";
  };

  return (
    <>
      {error === "error 404" ? (
        <ErrorComponent />
      ) : (
        <div>
          {test.name !== "" ? (
            <>
              {!currentEndStatus && currentQuestion.correctAnswer !== "" ? (
                <div className="row">
                  <h3 className="col s12 m12  l12 xl12  center-align">
                    {test.name}
                  </h3>

                  <div className="col s12 m12  l12 xl12 center-align">
                    {currentQuestion._id !== "" && (
                      <h4>{currentQuestion.question}</h4>
                    )}
                  </div>

                  <div className=" col s12 m12  l12 xl12 ">
                    {currentQuestion.allAnswer.map((answer, i) => {
                      return (
                        <div
                          style={{ padding: "5px" }}
                          className=" col s12 m6  l6 xl6"
                          onClick={() =>
                            answerSelect(answer.answer, currentQuestion._id)
                          }
                          key={i}
                        >
                          <div
                            onMouseEnter={() => setHover(answer.answer)}
                            onMouseLeave={() => setHover("")}
                            className={checkAnswer(answer)}
                            style={{ padding: "50px" }}
                          >
                            {" "}
                            {answer.answer}
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={nextQuestion}
                      className={checkNextQuestionButton()}
                    >
                      Weiter
                    </button>
                  </div>
                </div>
              ) : (
                <TestResult />
              )}
            </>
          ) : (
            <LoadingComponent />
          )}
        </div>
      )}
    </>
  );
};

export const OneTest = connect(mapStateToProps)(OneTestComponent);
