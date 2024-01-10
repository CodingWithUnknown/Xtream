const { Events, Client, Guild, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildDelete,
  /**
   * 
   * @param {Client} client 
   * @param {Guild} guild 
   * @returns 
   */
  execute: async (client, guild) => {
    let webhook = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN });
    let text;
    guild.channels.cache.forEach((x) => {
      if (x.type === ChannelType.GuildText && !text) text = x;
    });
    const embeds = new EmbedBuilder()
      .setAuthor({ name: 'Leaved to the server', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(guild.iconURL({ forceStatic: true, size: 4096 }))
      .addFields(
        { name: 'Server', value: `\`${guild.name}\` \`(${guild.id})\`` },
        { name: 'Owner', value: `\`${guild.members.cache.get(await guild?.fetchOwner().id) ? guild.members.cache.get(await guild?.fetchOwner().id).user.username : 'Unknown user'}\` \`(${await guild?.fetchOwner().id})\`` },
        { name: 'Member Count', value: `\`${guild.memberCount}\` Members` },
        { name: 'Creation Date', value: `<t:${parseInt(guild.createdAt / 1000)}:F> [<t:${parseInt(guild.createdAt / 1000)}:R>]` },
        { name: `${client.user.username}'s Server Count`, value: `\`${client.guilds.cache.size}\` Severs` }
      )
      .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setColor(0x141318)
      .setTimestamp();
    return await webhook.send({ username: 'Xtream Defender', embeds: [embeds], avatarURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
  }
};