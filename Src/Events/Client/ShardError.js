const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardError,
  execute: async (client, error, id) => {
    client.logger.log(`Shard Id: ${id}, Error: ${error} is encountered an Error`, 'error');
  }
};