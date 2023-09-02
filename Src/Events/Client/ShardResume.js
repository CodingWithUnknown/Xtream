const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardResume,
  execute: async (client, replayedEvents, id) => {
    client.logger.log(`Shard Id: ${id}, ReplayedEvents: ${replayedEvents} is Resumed`, 'log');
  }
};