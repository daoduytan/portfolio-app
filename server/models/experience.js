const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringType = maxlength => ({
  type: String,
  required: true,
  maxlength: maxlength
});

const experienceSchema = new Schema({
  userId: { type: String, required: true },
  title: stringType(256),
  company: stringType(256),
  location: stringType(150),
  position: stringType(256),
  description: stringType(2048),
  startDate: { type: Date, required: true },
  endDate: Date
});

module.exports = mongoose.model('Experience', experienceSchema);
