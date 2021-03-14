import { myTestsId } from "./auth.model";

export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISRER_SUCCESS = "REGISRER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";

export const MY_NEW_TEST = "MY_NEW_TEST";

export const register = (
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  password2: String
) => ({
  type: REGISTER,
  payload: { firstName, lastName, email, password, password2 },
});

export const login = (email: String, password: String) => ({
  type: LOGIN,
  payload: { email, password },
});
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: {},
});
export const registerSuccess = (token: string) => ({
  type: REGISRER_SUCCESS,
  payload: { token },
});

export const registerFail = () => ({
  type: REGISTER_FAIL,
  payload: {},
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
  payload: {},
});

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  payload: { token },
});

export const userLoading = (token: String) => ({
  type: USER_LOADING,
  payload: { token },
});

export const userLoaded = (
  firstName: String,
  lastName: String,
  admin: boolean,
  myTestsListe: myTestsId[]
) => ({
  type: USER_LOADED,
  payload: { firstName, lastName, admin, myTestsListe },
});

export const authError = () => ({
  type: AUTH_ERROR,
  payload: {},
});

export const myNewTest = (myTestId: String, name: String) => ({
  type: MY_NEW_TEST,
  payload: { myTestId, name },
});
