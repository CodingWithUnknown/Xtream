const { Schema, model } = require('mongoose');

module.export = model('OpenAI', new Schema({
  _id: Schema.Types.ObjectId,
  Guild: { type: String },
  Channel: { type: String }
}));