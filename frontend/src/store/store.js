import { combineReducers } from "redux";
import { applyMiddleware, createStore, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import { authEpics } from "./auth/auth.epics";
import { testDataEpics } from "./testData/testData.epics";
import { testEpics } from "./test/test.epics";

import authReducer from "./auth/auth.reducer";
import errorReducer from "./error/error.reducer";
import testDataReducer from "./testData/testData.reducer";
import testReducer from "./test/test.reducer";

const epic = combineEpics(...authEpics, ...testDataEpics, ...testEpics);

const epicDependencies = {};
const epicMiddleware = createEpicMiddleware({ dependencies: epicDependencies });

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      error: errorReducer,
      testData: testDataReducer,
      test: testReducer,
    }),
    undefined,
    composeWithDevTools(compose(applyMiddleware(epicMiddleware)))
  );
  epicMiddleware.run(epic);

  return store;
};
