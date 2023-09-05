const { Schema, model } = require('mongoose');

module.export = model('Logging', new Schema({
    Guild: String,
    User: String,
    UserRole: String,
    Bot: String,
    Channel: String,
    Message: String,
    Date: Date
}));