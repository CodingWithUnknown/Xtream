const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardReady,
  execute: async (client, event) => {
    client.logger.log(`Shard ${event} is Ready`, 'ready');
  }
};