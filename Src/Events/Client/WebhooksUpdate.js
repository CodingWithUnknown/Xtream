const { Events } = require('discord.js');

module.exports = {
    name: Events.WebhooksUpdate,
    execute: async (client, webhooks) => {
        console.log(webhooks)
    }
};