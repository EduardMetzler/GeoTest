import { Action } from "redux";
import { TestStore } from "./test.model";

import {
  CLEAR_ERRORS,
  endStatusUpdate,
  END_STATUS_UPDATE,
  myAnswersend,
  myTestCreate,
  myTestSave,
  MY_ANSWER_SEND,
  MY_TEST_LOADING,
  MY_TEST_SAVE,
  startStatusUpdate,
  START_STATUS_UPDATE,
  TEST_CLEAR,
} from "./test.actions";
import { getErrors, GET_ERRORS } from "../test/test.actions";
const INITIAL_STATE = {
  name: "",
  player: "",
  testTexts: [],
  _id: "",
  testDataOwner: "",
  error: "",
  end: false,
  start: false,
};

export default (
  state: TestStore = INITIAL_STATE,
  action: Action
): TestStore => {
  switch (action.type) {
    case MY_TEST_LOADING:
      return {
        ...state,
        name: "",
        player: "",
        testTexts: [],
        _id: "",
        testDataOwner: "",
        end: false,
        start: false,
      };

    case MY_TEST_SAVE:
      const save = action as ReturnType<typeof myTestSave>;

      return {
        ...state,
        name: save.payload.test.name,
        player: save.payload.test.player,
        testTexts: save.payload.test.testTexts,
        _id: save.payload.test._id,
        testDataOwner: save.payload.test.testDataOwner,
        end: save.payload.test.end,
        start: save.payload.test.start,
      };
    case TEST_CLEAR:
      return {
        ...state,
        name: "",
        player: "",
        testTexts: [],
        _id: "",
        testDataOwner: "",
        end: false,
        start: false,
      };

    case GET_ERRORS:
      const error = action as ReturnType<typeof getErrors>;

      return {
        ...state,
        error: error.payload.message,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      };

    case MY_ANSWER_SEND:
      const newAllTexts = action as ReturnType<typeof myAnswersend>;

      return {
        ...state,

        testTexts: newAllTexts.payload.newAllTexts,
      };

    case END_STATUS_UPDATE:
      const endStatus = action as ReturnType<typeof endStatusUpdate>;

      return {
        ...state,

        end: endStatus.payload.endStatus,
      };

    case START_STATUS_UPDATE:
      const startStatus = action as ReturnType<typeof startStatusUpdate>;

      return {
        ...state,

        start: startStatus.payload.startStatus,
      };

    default:
      return state;
  }
};
