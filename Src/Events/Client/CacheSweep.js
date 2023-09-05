const { Events } = require('discord.js');

module.exports = {
  name: Events.CacheSweep,
  once: true,
  execute: async (client) => {
    console.log(client);
  }
};