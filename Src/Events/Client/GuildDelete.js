const { Events, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildDelete,
  execute: async (client, guild) => {
    let channels = client.channels.cache.get(client.logs);
    let owners = await guild?.fetchOwner();
    let text;
    guild.channels.cache.forEach((x) => {
      if (x.type === ChannelType.GuildText && !text) text = x;
    });
    const embeds = new EmbedBuilder()
      .setAuthor(
        { name: 'Disconnected to the server', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields([
        { name: 'Server', value: `\`${guild.name}\` \`(${guild.id})\`` },
        { name: 'Owner', value: `\`${guild.members.cache.get(owners.id) ? guild.members.cache.get(owners.id).user.tag : 'Unknown user'}\` \`(${owners.id})\`` },
        { name: 'Member Count', value: `\`${guild.memberCount}\` Members` },
        { name: 'Creation Date', value: `<t:${parseInt(guild.createdAt / 1000)}:F> [<t:${parseInt(guild.createdAt / 1000)}:R>]` },
        { name: `${client.user.username}'s Server Count`, value: `\`${client.guilds.cache.size}\` Severs` }
      ])
      .setFooter(
        { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setColor(0x2c2d31)
      .setTimestamp();
    return await channels.send({ embeds: [embeds] });
  }
};