const { Events } = require('discord.js');

module.exports = {
  name: Events.Warn,
  execute: async (client, info) => {
    client.logger.log(info, 'warn');
  }
};