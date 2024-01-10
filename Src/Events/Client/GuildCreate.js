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
    let webhook = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN });
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
        { name: 'Owner', value: `\`${guild.members.cache.get(await guild?.fetchOwner().id) ? guild.members.cache.get(await guild?.fetchOwner().id).user.username : 'Unknown user'}\` \`(${await guild?.fetchOwner().id})\`` },
        { name: 'Member Count', value: `\`${guild.memberCount} Members\`` },
        { name: 'Creation Date', value: `<t:${parseInt(guild.createdAt / 1000)}:F> [<t:${parseInt(guild.createdAt / 1000)}:R>]` },
        { name: 'Guild Invite', value: `${`[Here is ${guild.name} invite](https://discord.gg/${invite.code})` ?? 'Unable to collect'}` },
        { name: 'Server Count', value: `\`${client.guilds.cache.size} Severs\`` }
      )
      .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
      .setColor(0x141318)
      .setTimestamp();
    await webhook.send({ username: 'Xtream Defender', embeds: [embeds], avatarURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
    if (guild.members.me.permissions.has(PermissionFlagsBits.ViewChannel && PermissionFlagsBits.SendMessages)) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Invite Me')
            .setStyle(ButtonStyle.Link)
            .setEmoji('1056290052155637870')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=962092097933021184&permissions=70368744177663&scope=bot%20applications.commands'),
          new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setEmoji('1055858759194390678')
            .setURL('https://discord.gg/VgT9u4PM2w')
        );
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setThumbnail(client.user.displayAvatarURL({ forceStatic: true, size: 4096 }))
        .addFields({ name: 'Hey, My name is Xtream.', value: 'I have some many features that you wants like Moderation, Informative, Games, Music and much more!' })
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x141318)
        .setTimestamp();
      return await guild.channels.cache.find((x) => x.type === ChannelType.GuildText).send({ embeds: [embeds], components: [row] });
    }
  }
};