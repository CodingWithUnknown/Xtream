const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    once: true,
    execute: async (client) => {
        console.log(client);
    }
};