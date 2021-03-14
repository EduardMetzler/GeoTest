const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: false },

  testTexts: [
    {
      question: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      allAnswer: [{ answer: { type: String, required: true } }],
      playerAnswer: { type: String },
    },
  ],

  player: { type: Types.ObjectId, ref: "User" },
  testDataOwner: { type: String, required: true, unique: false },
  end: { type: Boolean, required: true, unique: false },
  start: { type: Boolean, required: true, unique: false },
});

module.exports = model("Test", schema);
