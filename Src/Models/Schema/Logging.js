const { Schema, model } = require('mongoose');

module.export = model('Logging', new Schema({
    Guild: { type: String },
    User: { type: String },
    UserRole: { type: String },
    Bot: { type: String },
    Channel: { type: String },
    Message: { type: String },
    Date: { type: Date, default: new Date }
}));