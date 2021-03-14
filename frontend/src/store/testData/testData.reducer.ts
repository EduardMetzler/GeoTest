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
  CLEAR_MESSAGE,
  GET_MESSAGE,
  getMessage,
  clearMessage,
  TEST_DATA_SELECT_ARRAY_LOADED,
  testDataSelectArrayLoaded,
} from "./testData.actions";
const INITIAL_STATE = {
  testDataArray: [],
  oneTestDataArray: { name: "", _id: "", texts: [], publicStatus: false },
  loading: false,
  message: "",
  testDataNamenArray: [],
  testDataNamenArrayLoaded: false,
};

export default (
  state: TestDataStore = INITIAL_STATE,
  action: Action
): TestDataStore => {
  switch (action.type) {
    case NEW_TEST_DATA_CREATE:
      return {
        ...state,
      };

    case TEST_DATA_ARRAY_LOADED:
      const testDataListe = action as ReturnType<typeof testDataArrayLoaded>;

      return {
        ...state,
        testDataArray: testDataListe.payload.testDataListe,
        oneTestDataArray: { name: "", _id: "", texts: [], publicStatus: false },
        message: "",

        loading: false,
      };
    case ONE_TEST_DATA_ARRAY_LOADED:
      const oneTestData = action as ReturnType<typeof oneTestDataArrayLoaded>;

      return {
        ...state,
        oneTestDataArray: oneTestData.payload,

        testDataArray: [],
        loading: false,
      };

    case LOADING_STATUS:
      const status = action as ReturnType<typeof loadingStatus>;

      return {
        ...state,
        loading: status.payload.status,
      };
    default:
      return state;

    case TEST_DATA_DELETED:
      const message = action as ReturnType<typeof oneTestDataDeleted>;

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

      return {
        ...state,
        message: data.payload.message,
      };

    case TEST_DATA_SELECT_ARRAY_LOADED:
      const testDataListeForUser = action as ReturnType<
        typeof testDataSelectArrayLoaded
      >;

      return {
        ...state,

        testDataNamenArray: testDataListeForUser.payload.testDataListe,
        oneTestDataArray: { name: "", _id: "", texts: [], publicStatus: false },
        message: "",
        testDataNamenArrayLoaded: true,
        loading: false,
      };
  }
};
