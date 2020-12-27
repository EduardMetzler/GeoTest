const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  texts: [{ type: Types.ObjectId, ref: "Text" }],
});

module.exports = model("TestData", schema);
