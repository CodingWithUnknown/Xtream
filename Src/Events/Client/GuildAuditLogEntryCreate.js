const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    once: true,
    execute: async (client) => {
        console.log(client);
    }
};