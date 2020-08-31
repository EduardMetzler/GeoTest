export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const getErrors = (message: Object) => ({
  type: GET_ERRORS,
  payload: { message },
});

export const clearErrors = () => ({
  type: GET_ERRORS,
  payload: {},
});
