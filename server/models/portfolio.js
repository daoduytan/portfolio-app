const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringType = maxlength => ({
  type: String,
  required: true,
  maxlength: maxlength
});

const portfolioSchema = new Schema({
  userId: { type: String, required: true },
  name: stringType(256),
  url: stringType(256),
  git: stringType(150),
  description: stringType(2048)
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
