import { ofType } from "redux-observable";

import { mergeMap, catchError } from "rxjs/operators";

import { ajax } from "rxjs/ajax";
import {
  myAnswersend,
  myTestCreate,
  myTestSave,
  MY_ANSWER_SEND,
  MY_TEST_CREATE,
  startStatusUpdate,
  START_STATUS_UPDATE,
  testLoading,
  TEST_LOADING,
} from "./test.actions";
import {} from "../test/test.actions";
import { getErrors } from "../test/test.actions";
import { clearErrors } from "../test/test.actions";
import { logoutSuccess } from "../auth/auth.actions";
export const BASE_URL = "http://localhost:5000";

const epicTestCreate = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof myTestCreate>>(MY_TEST_CREATE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test/test-create/${payload.oneTestDataId}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [myTestSave(responseData["test"]), clearErrors()];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicTestLoading = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof testLoading>>(TEST_LOADING),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test/${payload.testId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [clearErrors(), myTestSave(responseData["oneTest"])];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"]), logoutSuccess()];
        })
      )
    )
  );

const epicMyAnswersend = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof myAnswersend>>(MY_ANSWER_SEND),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test/update/${payload.testId}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          return [clearErrors()];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);
          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicStartStatusUpdate = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof startStatusUpdate>>(START_STATUS_UPDATE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test/startStatus/update/${payload.testId}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          return [clearErrors()];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);
          return [getErrors(responseData["message"])];
        })
      )
    )
  );

export const testEpics = [
  epicTestCreate,
  epicTestLoading,
  epicMyAnswersend,
  epicStartStatusUpdate,
];
