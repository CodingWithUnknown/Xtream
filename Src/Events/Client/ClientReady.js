const { Events, ActivityType, PresenceUpdateStatus } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    //client.manager.init(client.user.id);
    client.logger.success(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: 'Xtream', type: ActivityType.Watching }], status: PresenceUpdateStatus.Online });
  }
};