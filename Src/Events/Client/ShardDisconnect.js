const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardDisconnect,
  execute: async (client, event, id) => {
    client.logger.log(`Shard Event: ${event}, Id: ${id} Disconnected`, 'warn');
  }
};