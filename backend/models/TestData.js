const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  texts: [{ type: Types.ObjectId, ref: "Text" }],
  publicStatus: { type: Boolean, required: true },
});

module.exports = model("TestData", schema);
