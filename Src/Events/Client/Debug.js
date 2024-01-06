const { Events } = require('discord.js');

module.exports = {
  name: Events.Debug,
  execute: async (client, info) => {
    client.logger.debug(info);
  }
};