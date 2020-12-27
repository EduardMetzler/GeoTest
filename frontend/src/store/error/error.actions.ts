export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const getErrors = (message: string) => ({
  type: GET_ERRORS,
  payload: { message },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  payload: {},
});
