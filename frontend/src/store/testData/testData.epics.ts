import { ofType } from "redux-observable";

import { mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

import {
  newTestDataCreate,
  NEW_TEST_DATA_CREATE,
  TEST_DATA_ARRAY_LOADING,
  testDataArrayLoaded,
  ONE_TEST_DATA_ARRAY_LOADING,
  oneTestDataArrayLoading,
  oneTestDataArrayLoaded,
  testDataArrayLoading,
  loadingStatus,
  oneTestDataUpdate,
  ONE_TEST_DATA_UPDATE,
  questionDelete,
  QUESTION_DELETE,
  TEST_DATA_DELETE,
  oneTestDataDelete,
  oneTestDataDeleted,
  getMessage,
  testDataPublicStatus,
  TESTDATA_PUBLIC_STATUS,
  TEST_DATA_SELECT_ARRAY_LOADING,
  testDataSelectArrayLoading,
  testDataSelectArrayLoaded,
} from "./testData.actions";
import { getErrors, clearErrors } from "../error/error.actions";
export const BASE_URL = "http://localhost:5000";

const epicNewTestDataCreate = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof newTestDataCreate>>(NEW_TEST_DATA_CREATE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/cteate`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          return [testDataArrayLoading(), clearErrors()];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"]), loadingStatus(false)];
        })
      )
    )
  );

const epicTestDataArrayLoading = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof newTestDataCreate>>(TEST_DATA_ARRAY_LOADING),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/loading`,
        method: "GET",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [
            clearErrors(),
            testDataArrayLoaded(responseData["testDataListe"]),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);

          return [getErrors(responseData["message"]), loadingStatus(false)];
        })
      )
    )
  );

const epicOneTestDataArrayLoading = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof oneTestDataArrayLoading>>(
      ONE_TEST_DATA_ARRAY_LOADING
    ),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/one/loading/${payload.oneTestDataId}`,

        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [
            clearErrors(),
            oneTestDataArrayLoaded(responseData.oneTestData),
            loadingStatus(false),
            getMessage("loaded"),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicoNeTestDataUpdate = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof oneTestDataUpdate>>(ONE_TEST_DATA_UPDATE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/one/update/${payload.oneTestDataId}`,

        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];
          console.log("epicoNeTestDataUpdate", responseData);

          return [
            clearErrors(),
            loadingStatus(true),
            oneTestDataArrayLoading(responseData.oneTestDataId),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicOneQuestionDelete = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof questionDelete>>(QUESTION_DELETE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/one-question-delete/${payload.id}`,

        method: "DELETE",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];
          console.log(responseData);

          return [
            oneTestDataArrayLoading(payload.oneTestDataId),
            clearErrors(),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicOneTestDataDelete = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof oneTestDataDelete>>(TEST_DATA_DELETE),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/one-test-data-delete/${payload.id}`,

        method: "DELETE",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [clearErrors(), oneTestDataDeleted(responseData.message)];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicTestDataPublicStatus = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof testDataPublicStatus>>(TESTDATA_PUBLIC_STATUS),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data/one/public-status/${payload.oneTestDataId}`,

        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [
            clearErrors(),

            loadingStatus(true),

            oneTestDataArrayLoading(responseData.oneTestDataId),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];

          return [getErrors(responseData["message"])];
        })
      )
    )
  );

const epicTestDataSelectArrayLoading = (action$: any) =>
  action$.pipe(
    ofType<ReturnType<typeof testDataSelectArrayLoading>>(
      TEST_DATA_SELECT_ARRAY_LOADING
    ),
    mergeMap(({ payload }) =>
      ajax({
        url: `${BASE_URL}/api/test-data//select/loading`,
        method: "GET",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "auth-token": payload.token,
          authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      }).pipe(
        mergeMap((response) => {
          const responseData = response["response"];

          return [
            clearErrors(),
            testDataSelectArrayLoaded(responseData["testDataListe"]),
          ];
        }),
        catchError((error) => {
          const responseData = error["response"];
          console.log(responseData);

          return [getErrors(responseData["message"]), loadingStatus(false)];
        })
      )
    )
  );

export const testDataEpics = [
  epicNewTestDataCreate,
  epicTestDataArrayLoading,
  epicOneTestDataArrayLoading,
  epicoNeTestDataUpdate,
  epicOneQuestionDelete,
  epicOneTestDataDelete,
  epicTestDataPublicStatus,
  epicTestDataSelectArrayLoading,
];
