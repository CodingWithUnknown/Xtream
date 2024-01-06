const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardReady,
  execute: async (client, event) => {
    client.logger.success(`Shard ${event} is Ready`);
  }
};