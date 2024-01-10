const { Events } = require('discord.js');

module.exports = {
  name: Events.ShardResume,
  execute: async (client, replayedEvents, id) => {
    client.logger.system(`Shard ${id}, ReplayedEvents: ${replayedEvents} is Resumed`);
  }
};