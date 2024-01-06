const { Client, Guild, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, WebhookClient } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  /**
   * 
   * @param {Client} client 
   * @param {Guild} guild 
   * @returns 
   */
  execute: async (client, guild) => {
    let channels = client.channels.cache.get(client.logs);
    let text;
    guild.channels.cache.forEach((x) => {
      if (x.type === ChannelType.GuildText && !text) text = x;
    });
    let invite = await text.createInvite({ reason: `For ${client.user.tag} Developer(s)`, maxAge: 0 });
    const embeds = new EmbedBuilder()
      .setAuthor({ name: 'Joined to a new server', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
      .setThumbnail(guild.iconURL({ forceStatic: true, size: 4096 }))
      .addFields(
        { name: 'Server', value: `\`${guild.name}\` \`(${guild.id})\`` },
        { name: 'Owner', value: `\`${guild.members.cache.get(await guild?.fetchOwner().id) ? guild.members.cache.get(await guild?.fetchOwner().id).user.tag : 'Unknown user'}\` \`(${await guild?.fetchOwner().id})\`` },
        { name: 'Member Count', value: `\`${guild.memberCount} Members\`` },
        { name: 'Creation Date', value: `<t:${parseInt(guild.createdAt / 1000)}:F> [<t:${parseInt(guild.createdAt / 1000)}:R>]` },
        { name: 'Guild Invite', value: `${`[Here is ${guild.name} invite](https://discord.gg/${invite.code})` ?? 'Unable to collect'}` },
        { name: 'Server Count', value: `\`${client.guilds.cache.size} Severs\`` }
      )
      .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
      .setColor(0x2c2d31)
      .setTimestamp();
    await channels.send({ embeds: [embeds] });
    if (guild.members.me.permissions.has(PermissionFlagsBits.ViewChannel && PermissionFlagsBits.SendMessages)) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setThumbnail(client.user.displayAvatarURL({ forceStatic: true, size: 4096 }))
        .addFields({ name: 'Hey, My name is Xtream.', value: 'I have some many features that you wants like Moderation, Informative, Games, Music and much more!' })
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await guild.channels.cache.find((x) => x.type === ChannelType.GuildText).send({ content: 'https://discord.gg/VgT9u4PM2w', embeds: [embeds] });
    }
  }
};