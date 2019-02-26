// all mongodb documents have a 4mb limit of storage.  So, we don't want to store the surveys
// on the user model
const mongoose = require("mongoose");
const { Schema } = mongoose;
//below is referencing the sub document
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //an array containing a list of strings (email addresses)
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //below is a relationship field assigning each survey to a user
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
