import { AuthStore } from "./auth/auth.model";
import { ErrorStore } from "./error/error.model";

export interface AppState {
  auth: AuthStore;
  error: ErrorStore;
}
