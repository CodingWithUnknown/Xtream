const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    //client.manager.init(client.user.id);
    client.logger.log(`Logged in as ${client.user.tag}`, 'ready');
    client.user.setPresence({ activities: [{ name: 'Xtream', type: ActivityType.Watching }], status: 'online' });
  }
};