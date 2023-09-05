const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.TypingStart,
  once: true,
  execute: async (client) => {
    console.log(client);
  }
};