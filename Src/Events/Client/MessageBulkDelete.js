const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageBulkDelete,
    once: true,
    execute: async (client) => {
        console.log(client);
    }
};