export interface AuthStore {
  token: String | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  firstName: String;
  lastName: String;
  user: Object;
}
