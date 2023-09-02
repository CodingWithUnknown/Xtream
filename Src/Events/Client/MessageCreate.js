const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute: async (client, message) => {
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
          { name: 'Hey, I\'m Xara. Need help?', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setDescription(`>>> *You can see everything I can do by using the (/) command.*\n\n*In this case if you have any questions, suggestions or found a bug, please visit our [Headquarters (HQ)](https://discord.gg/VgT9u4PM2w)*`)
        .setFooter(
          { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2f3136)
        .setTimestamp();
      return await message.reply({ embeds: [embeds], components: [row] });
    }
  }
};