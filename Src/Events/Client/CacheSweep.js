const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.CacheSweep,
  once: true,
  execute: async (client) => {
    console.log(client);
  }
};