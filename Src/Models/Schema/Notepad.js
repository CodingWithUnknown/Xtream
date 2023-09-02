const { Schema, model } = require('mongoose');

module.export = model('Notepad', new Schema({
  _id: Schema.Types.ObjectId,
  Guild: String,
  User: {
    type: String, default: {
      Username: { type: String },
      Discriminator: { type: String },
      ID: { type: String }
    }
  },
  Information: { type: Array }
}));