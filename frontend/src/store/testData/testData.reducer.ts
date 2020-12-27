import { Action } from "redux";
import { TestDataStore } from "./testData.model";

import {
  TEST_DATA_ARRAY_LOADED,
  testDataArrayLoaded,
  oneTestDataArrayLoaded,
  ONE_TEST_DATA_ARRAY_LOADED,
  testDataArrayLoading,
  TEST_DATA_ARRAY_LOADING,
  NEW_TEST_DATA_CREATE,
  LOADING_STATUS,
  loadingStatus,
  QUESTION_DELETE,
  ONE_TEST_DATA_UPDATE,
  oneTestDataDeleted,
  TEST_DATA_DELETED,
  oneTestDataDelete,
  CLEAR_MESSAGE,
  GET_MESSAGE,
  getMessage,
  clearMessage,
} from "./testData.actions";
const INITIAL_STATE = {
  testDataArray: [],
  oneTestDataArray: { name: "", _id: "", texts: [] },
  loading: false,
  message: "",
};

export default (
  state: TestDataStore = INITIAL_STATE,
  action: Action
): TestDataStore => {
  switch (action.type) {
    case NEW_TEST_DATA_CREATE:
      // const testDataListe = action as ReturnType<typeof testDataArrayLoading>;

      return {
        ...state,
      };

    case TEST_DATA_ARRAY_LOADED:
      const testDataListe = action as ReturnType<typeof testDataArrayLoaded>;

      return {
        ...state,
        testDataArray: testDataListe.payload.testDataListe,
        oneTestDataArray: { name: "", _id: "", texts: [] },
        message: "",

        loading: false,
      };
    case ONE_TEST_DATA_ARRAY_LOADED:
      const oneTestData = action as ReturnType<typeof oneTestDataArrayLoaded>;
      console.log("ONE_TEST_DATA_ARRAY_LOADED");

      return {
        ...state,
        oneTestDataArray: oneTestData.payload,
        // oneTestDataArray:oneTestData.payload.oneTestData.name,
        testDataArray: [],
        loading: false,
        // message: "loaded",
      };

    case LOADING_STATUS:
      const status = action as ReturnType<typeof loadingStatus>;
      // console.log(oneTestData);

      return {
        ...state,
        loading: status.payload.status,
        // loading: false,
      };
    default:
      return state;

    case TEST_DATA_DELETED:
      const message = action as ReturnType<typeof oneTestDataDeleted>;
      // console.log(datau);

      return {
        ...state,

        message: message.payload.message,
        loading: false,
      };

    case CLEAR_MESSAGE:
      const messageClear = action as ReturnType<typeof clearMessage>;

      return {
        ...state,
        message: "",
      };

    case GET_MESSAGE:
      const data = action as ReturnType<typeof getMessage>;
      // console.log(data);

      return {
        ...state,
        message: data.payload.message,
      };
  }
};
