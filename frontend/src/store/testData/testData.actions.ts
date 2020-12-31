import { TestData } from "./testData.model";

export const NEW_TEST_DATA_CREATE = "NEW_TEST_DATA_CREATE";
export const TEST_DATA_ARRAY_LOADING = "TEST_DATA_ARRAY_LOADING";
export const TEST_DATA_ARRAY_LOADED = "TEST_DATA_ARRAY_LOADED";
export const ONE_TEST_DATA_ARRAY_LOADING = "ONE_TEST_DATA_ARRAY_LOADING";
export const ONE_TEST_DATA_ARRAY_LOADED = "ONE_TEST_DATA_ARRAY_LOADED";
export const LOADING_STATUS = "LOADING_STATUS";
export const ONE_TEST_DATA_UPDATE = "ONE_TEST_DATA_UPDATE";
export const QUESTION_DELETE = "QUESTION_DELETE";
export const TEST_DATA_DELETE = "TEST_DATA_DELETE";
export const TEST_DATA_DELETED = "TEST_DATA_DELETED";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";
export const TESTDATA_PUBLIC_STATUS = "TESTDATA_PUBLIC_STATUS";

export const newTestDataCreate = (newTestDataName: string) => ({
  type: "NEW_TEST_DATA_CREATE",
  payload: { testDataName: newTestDataName },
});

export const testDataArrayLoading = () => ({
  type: "TEST_DATA_ARRAY_LOADING",
  payload: {},
});

export const testDataArrayLoaded = (testDataListe: TestData[]) => ({
  type: "TEST_DATA_ARRAY_LOADED",
  payload: { testDataListe },
});

export const oneTestDataArrayLoading = (oneTestDataId: String) => ({
  type: "ONE_TEST_DATA_ARRAY_LOADING",
  payload: { oneTestDataId },
});

export const oneTestDataArrayLoaded = (oneTestData: TestData) => ({
  type: "ONE_TEST_DATA_ARRAY_LOADED",
  payload: oneTestData,
});
export const loadingStatus = (status: boolean) => ({
  type: "LOADING_STATUS",
  payload: { status },
});

export const oneTestDataUpdate = (
  oneTestData: TestData,
  oneTestDataId: String
) => ({
  type: "ONE_TEST_DATA_UPDATE",
  payload: { oneTestData, oneTestDataId },
});

export const questionDelete = (id: String, oneTestDataId: string) => ({
  type: "QUESTION_DELETE",
  payload: { id, oneTestDataId },
});

export const oneTestDataDelete = (id: String) => ({
  type: "TEST_DATA_DELETE",
  payload: { id },
});
export const oneTestDataDeleted = (message: string) => ({
  type: "TEST_DATA_DELETED",
  payload: { message },
});

export const clearMessage = () => ({
  type: "CLEAR_MESSAGE",
  // payload: null,
});

export const getMessage = (message: string) => ({
  type: "GET_MESSAGE",
  payload: { message },
});

export const testDataPublicStatus = (
  status: boolean,
  oneTestDataId: string
) => ({
  type: "TESTDATA_PUBLIC_STATUS",
  payload: { status, oneTestDataId },
});
