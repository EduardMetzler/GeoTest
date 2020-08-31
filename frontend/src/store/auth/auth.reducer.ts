import { Action } from "redux";
import { AuthStore } from "./auth.model";

import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISRER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  loginSuccess,
  userLoaded,
  REGISTER,
} from "./auth.actions";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  firstName: "",
  lastName: "",

  user: Object,
};

export default (
  state: AuthStore = INITIAL_STATE,
  action: Action
): AuthStore => {
  switch (action.type) {
    case REGISTER:
      return { ...state, isLoading: true };
    case USER_LOADING:
      return { ...state, isLoading: true };

    case USER_LOADED:
      const userDaten = action as ReturnType<typeof userLoaded>;
      console.log(userDaten.payload);

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        firstName: userDaten.payload.firstName,
        lastName: userDaten.payload.lastName,
      };
    case LOGIN_SUCCESS:
    case REGISRER_SUCCESS:
      const token = action as ReturnType<typeof loginSuccess>;

      localStorage.setItem("token", token.payload.token);

      return {
        ...state,
        token: token.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        firstName: "",
        lastName: "",
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
