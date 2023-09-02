const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardReconnecting,
  execute: async (client, id) => {
    client.logger.log(`Shard #${id} is Reconnecting`, 'log');
  }
};