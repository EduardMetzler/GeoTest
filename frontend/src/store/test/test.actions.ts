import { TestStore } from "./test.model";

export const MY_TEST_LOADING = "MY_TEST_LOADING";
export const MY_TEST_CREATE = "MY_TEST_CREATE";
export const MY_TEST_SAVE = "MY_TEST_SAVE";
export const TEST_CLEAR = "TEST_CLEAR";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const TEST_LOADING = "TEST_LOADING";
export const MY_ANSWER_SEND = "MY_ANSWER_SEND";
export const END_STATUS_UPDATE = "END_STATUS_UPDATE";
export const START_STATUS_UPDATE = "START_STATUS_UPDATE";
export const MY_NEW_TEST = " MY_NEW_TEST";
export const GET_ALL_MY_TESTS = "GET_ALL_MY_TESTS";

export const myTestCreate = (oneTestDataId: String) => ({
  type: MY_TEST_CREATE,
  payload: { oneTestDataId },
});

export const myTestSave = (test: TestStore) => ({
  type: MY_TEST_SAVE,
  payload: { test },
});

export const testClear = () => ({
  type: TEST_CLEAR,
  payload: {},
});

export const getErrors = (message: string) => ({
  type: GET_ERRORS,
  payload: { message },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  payload: {},
});

export const testLoading = (testId: any) => ({
  type: TEST_LOADING,
  payload: { testId },
});

export const myAnswersend = (newAllTexts: any, testId: String) => ({
  type: MY_ANSWER_SEND,
  payload: { newAllTexts, testId },
});

export const endStatusUpdate = (endStatus: boolean) => ({
  type: END_STATUS_UPDATE,
  payload: { endStatus },
});

export const startStatusUpdate = (startStatus: boolean, testId: string) => ({
  type: START_STATUS_UPDATE,
  payload: { startStatus, testId },
});
