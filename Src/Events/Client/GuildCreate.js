const { Events, EmbedBuilder, WebhookClient, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  execute: async (client, guild) => {
    let channels = client.channels.cache.get(client.logs);
    let owners = await guild?.fetchOwner();
    let text;
    await guild.channels.cache.forEach((x) => {
      if (x.type === ChannelType.GuildText && !text) text = x;
    });
    console.log(guild)
    let invite = await text.createInvite({ reason: `For ${client.user.tag} Developer(s)`, maxAge: 0 });
    const embed = new EmbedBuilder()
      .setAuthor(
        { name: 'Joined to a new server', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields([
        { name: 'Server', value: `\`${guild.name}\` \`(${guild.id})\`` },
        { name: 'Owner', value: `\`${guild.members.cache.get(owners.id) ? guild.members.cache.get(owners.id).user.tag : 'Unknown user'}\` \`(${owners.id})\`` },
        { name: 'Member Count', value: `\`${guild.memberCount}\` Members` },
        { name: 'Creation Date', value: `<t:${parseInt(guild.createdAt / 1000)}:F> [<t:${parseInt(guild.createdAt / 1000)}:R>]` },
        { name: 'Guild Invite', value: `${`[Here is ${guild.name} invite](https://discord.gg/${invite.code})` ?? 'Unable to collect'}` },
        { name: `${client.user.username}'s Server Count`, value: `\`${client.guilds.cache.size}\` Severs` }
      ])
      .setFooter(
        { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setColor(0x2c2d31)
      .setTimestamp();
    await channels.send({ embeds: [embed] });
    let intro = await guild.channels.cache.forEach((x) => {
      if (x.type === ChannelType.GuildText && !text) text = x;
    });
    const embeds = new EmbedBuilder()
      .setAuthor(
        { name: 'Xtream defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        { name: 'Heyo, My name is Xtream.', value: 'I have many features that your server wants like Moderation, Games, Music and much more!' },
      ])
      .setFooter(
        { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setColor(0x2c2d31)
      .setTimestamp();
    return await intro.send({ content: 'https://discord.gg/k4tMwHNpdM', embeds: [embeds] });
  }
};