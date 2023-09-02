const { Schema, model } = require('mongoose');

module.export = model('OpenAI', new Schema({
  Guild: { type: String },
  Channel: { type: String }
}));