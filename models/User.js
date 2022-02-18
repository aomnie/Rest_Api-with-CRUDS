
const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, "You must provide a name"],
  },
  email: {
    type: Schema.Types.String,
    required: [true, "you must provide an email"],
  },
  username: {
    type: Schema.Types.String,
    required: [true, "you must provide a username"],
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: [[true, "you must provide a password"]],
  },
});

const User = model("User", userSchema);
module.exports = User;