import { AuthStore } from "./auth/auth.model";
import { ErrorStore } from "./error/error.model";
import { TestDataStore } from "./testData/testData.model";

export interface AppState {
  auth: AuthStore;
  error: ErrorStore;
  testData: TestDataStore;
}
