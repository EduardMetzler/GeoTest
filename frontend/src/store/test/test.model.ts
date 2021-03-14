export interface TestStore {
  name: String;
  player: String;
  testTexts: TestText[];
  _id: String;
  testDataOwner: String;
  error: String;
  end: boolean;
  start: boolean;
}

export interface TestText {
  allAnswer: OneAnswer[];
  correctAnswer: String;
  question: String;
  _id: String;
  playerAnswer: String;
}

export interface OneAnswer {
  answer: String;
  id: String;
}
