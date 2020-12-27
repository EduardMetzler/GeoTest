const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  correctAnswer: { type: String, required: false, unique: false },
  question: { type: String, required: false, unique: false },
  owner: { type: Types.ObjectId, ref: "TestData" },
});

module.exports = model("Text", schema);
