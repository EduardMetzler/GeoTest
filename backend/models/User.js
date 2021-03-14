const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  // myTestsListe: [{ type: Types.ObjectId, ref: "Test" }],
  myTestsListe: [
    {
      id: { type: Types.ObjectId, ref: "Test" },
      name: { type: String, required: true },
    },
  ],
});

module.exports = model("User", schema);
