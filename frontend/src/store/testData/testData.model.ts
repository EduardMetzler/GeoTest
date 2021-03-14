export interface TestDataStore {
  testDataArray: TestData[];
  oneTestDataArray: TestData;
  loading: boolean;
  message: string;
  testDataNamenArray: TestData[];
  testDataNamenArrayLoaded: boolean;
}

export interface TestData {
  name: string;
  _id: string;
  texts: Question[];
  publicStatus: boolean;
}

export interface Question {
  question: string;
  correctAnswer: string;
  _id: string;
}
