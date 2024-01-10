const { Client, Message, Events, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @returns 
   */
  execute: async (client, message) => {
    if (message.author.bot) return;
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.ViewChannel && PermissionFlagsBits.SendMessages)) return;
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) return await message.reply({ content: `I don't have \`EmbedLinks\` permission to use this command.`, ephemeral: true });
    // if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.Administrator)) return await message.reply({ content: 'I don\'t have enough permissions to use this command.' });
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)`))) {
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
        .setAuthor(
          { name: 'Hey, I\'m Xtream. Need help?', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setDescription(`>>> *You can see everything I can do by using the (/) command.*\n\n*In this case if you have any questions, suggestions or found a bug, please visit our [Headquarters (HQ)](https://discord.gg/VgT9u4PM2w)*`)
        .setFooter(
          { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x141318)
        .setTimestamp();
      return await message.reply({ embeds: [embeds], components: [row] });
    }
  }
};