const { Events, EmbedBuilder, WebhookClient } = require('discord.js');

module.exports = {
  name: Events.Error,
  execute: async (client, error) => {
    client.logger.log(error, 'error');
    let webhook = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN })
    const embeds = new EmbedBuilder()
      .setAuthor(
        { name: 'Xara Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setDescription(`\`\`\`\n${error}\n\`\`\``)
      .setFooter(
        { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setColor(0x2f3136)
      .setTimestamp();
    return await webhook.send({ username: client.user.username, avatar: client.user.displayAvatarURL({ dynamic: true }), embeds: [embeds] });
  }
};