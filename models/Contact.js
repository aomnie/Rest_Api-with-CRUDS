const mongoose = require("mongoose");

let contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "You must provide a firstname"],
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
});

module.exports = Contact = mongoose.model("contact", contactSchema);

