export interface TestDataStore {
  testDataArray: TestData[];
  oneTestDataArray: TestData;
  loading: boolean;
  message: string;
}

export interface TestData {
  name: string;
  _id: string;
  texts: Question[];
  publicStatus: boolean;
  // token: String | null;
  // isAuthenticated: boolean;
  // isLoading: boolean;
  // firstName: String;
  // lastName: String;
  // user: Object;
  // admin: boolean;
}

export interface Question {
  question: string;
  correctAnswer: string;
  _id: string;
  // owner: string;
  // token: String | null;
  // isAuthenticated: boolean;
  // isLoading: boolean;
  // firstName: String;
  // lastName: String;
  // user: Object;
  // admin: boolean;
}
