const { Schema, model } = require('mongoose');

module.exports = model('Suspension', new Schema({
  _id: Schema.Types.ObjectId,
  User: { type: String },
}));