const { Schema, model } = require('mongoose');

module.exports = model('Suspention', new Schema({
  _id: Schema.Types.ObjectId,
  User: { type: String },
}));