const { Schema, model } = require('mongoose');

module.exports = model('Ostracize', new Schema({
  _id: Schema.Types.ObjectId,
  User: { type: String },
}));