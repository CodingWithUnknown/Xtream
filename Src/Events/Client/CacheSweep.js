const { Events } = require('discord.js');

module.exports = {
  name: Events.CacheSweep,
  execute: async (client) => {
    console.log('is working...', client);
  }
};