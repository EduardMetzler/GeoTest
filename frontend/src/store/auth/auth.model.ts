export interface AuthStore {
  token: String | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  firstName: String;
  lastName: String;
  admin: boolean;
  myTestsListe: myTestsId[];
}

export interface myTestsId {
  id: String;
  _id: String;
}
