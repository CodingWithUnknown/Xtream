const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    once: true,
    execute: async (client) => {
        console.log(client);
    }
};