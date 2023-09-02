const { Schema, model } = require('mongoose');

module.export = model('Badges', new Schema({
  User: String,
  Badges: {
    type: Array
  },
}));