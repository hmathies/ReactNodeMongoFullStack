//sub document collection -- notice how it is exported
const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
