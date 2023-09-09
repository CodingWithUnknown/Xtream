const { Schema, model } = require('mongoose');

module.export = model('Logging', new Schema({
    Guild: { type: String },
    User: { type: String },
    Channel: { type: String },
    MemberRole: { type: String },
    BotRole: { type: String },
    Message: { type: String },
    Date: { type: Date, default: new Date }
}));