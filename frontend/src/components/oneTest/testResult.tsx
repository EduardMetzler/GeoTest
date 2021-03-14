import React, { useEffect, useState } from "react";

import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";

import { TestStore } from "../../store/test/test.model";
import { testLoading } from "../../store/test/test.actions";
import { useParams } from "react-router-dom";

interface ConnectedState {
  test: TestStore;
  error: String;
}

const mapStateToProps = (state: AppState) => ({
  test: state.test,
  error: state.test.error,
});

export const TestResultComponent: React.FC<ConnectedState> = ({ test }) => {
  const { testId }: any = useParams();
  const [testResult, setTestResult] = useState({
    correctAnswer: 0,
    noCorrectAnswer: 0,
  });

  if (testResult.correctAnswer === 0 && testResult.noCorrectAnswer === 0) {
    var correct = 0;
    var noCorrect = 0;
    test.testTexts.map((oneText) => {
      oneText.allAnswer.map((oneAnswewr) => {
        if (
          oneAnswewr.answer === oneText.playerAnswer &&
          oneAnswewr.answer == oneText.correctAnswer
        ) {
          correct = correct + 1;
        }
        if (
          oneAnswewr.answer === oneText.playerAnswer &&
          oneAnswewr.answer !== oneText.correctAnswer
        ) {
          noCorrect = noCorrect + 1;
        }
      });
      setTestResult({
        correctAnswer: correct,
        noCorrectAnswer: noCorrect,
      });
    });
  }

  const dispatch = useDispatch();
  if (test.name === "") {
    dispatch(testLoading(testId));
  }

  const checkAnswer = (answer: any, playerAnswer: any, correctAnswer: any) => {
    if (answer === playerAnswer && playerAnswer === correctAnswer) {
      return "light-green accent-3 ";
    }

    if (answer === playerAnswer && playerAnswer !== correctAnswer) {
      return "red darken-2 ";
    }
    if (answer === correctAnswer && playerAnswer !== correctAnswer) {
      return "yellow lighten-1 ";
    }
    return "grey lighten-2 ";
  };
  return (
    <>
      <h4>{test.name}</h4>
      <h5>Richtig: {testResult.correctAnswer}</h5>
      <h5>Falsch: {testResult.noCorrectAnswer}</h5>

      <div>
        {test.testTexts.map((oneTestText, i1) => (
          <div key={i1} className="row">
            <h4>{oneTestText.question}</h4>
            {oneTestText.allAnswer.map((oneAnswer, i2) => (
              <div
                style={{ padding: "5px" }}
                className=" col s6 m6  l6 xl6 center-align"
                key={i2}
              >
                <div
                  style={{ padding: "50px" }}
                  className={checkAnswer(
                    oneAnswer.answer,
                    oneTestText.playerAnswer,
                    oneTestText.correctAnswer
                  )}
                >
                  {oneAnswer.answer}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export const TestResult = connect(mapStateToProps)(TestResultComponent);
