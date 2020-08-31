import { Action } from "redux";
import { ErrorStore } from "./error.model";

import { GET_ERRORS, getErrors, CLEAR_ERRORS } from "./error.actions";
const INITIAL_STATE = {
  message: {},
  status: "",
  id: "",
};

export default (
  state: ErrorStore = INITIAL_STATE,
  action: Action
): ErrorStore => {
  switch (action.type) {
    case GET_ERRORS:
      const error = action as ReturnType<typeof getErrors>;

      return {
        message: error.payload.message,
        status: "",
        id: "",
      };

    case CLEAR_ERRORS:
      return {
        message: {},
        status: "",
        id: "",
      };
    default:
      return state;
  }
};
