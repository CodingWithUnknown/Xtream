const { Schema, model } = require('mongoose');

module.export = model('Badges', new Schema({
  _id: Schema.Types.ObjectId,
  User: { type: String },
  Badges: { type: Array }
}));