const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardReconnecting,
  execute: async (client, id) => {
    client.logger.await(`Shard ${id} is Reconnecting`);
  }
};