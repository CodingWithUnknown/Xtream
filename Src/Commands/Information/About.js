const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const si = require('systeminformation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Shows information about The Xtream Defender')
    .addSubcommand((options) => options
      .setName('info')
      .setDescription('Shows information about The Xtream Defender')
    ),
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'info':
        const raw = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel('Support')
            .setCustomId('support')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/VgT9u4PM2w'),
            new ButtonBuilder()
              .setLabel('Invite')
              .setCustomId('invite')
              .setStyle(ButtonStyle.Link)
              .setURL('https://discord.gg/VgT9u4PM2w')
          )

        const embeds = new EmbedBuilder()
          .setAuthor({ name: `${client.users.cache.find((x) => x.id == process.env.AUTH_OWNER_ID).globalName}`, iconURL: client.users.cache.find((x) => x.id == process.env.DEVELOPER_OWNER).displayAvatarURL({ size: 4096 }) })
          .setTitle('__Official Bot Server Invite__')
          .setURL('https://discord.gg/VgT9u4PM2w')
          .setDescription('<:Waves:1055864282614595654> Hey, It\'s Xtream Defender. The Higher Defense Bot for your Discord Server. I\m a Multi-purpose loaded with Higher Defending of many features like none other.')
          .addFields(
            {
              name: 'Xtream Information', value: [
                `Name: ${client.user.displayName} (\`${client.user.id}\`)`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: 'Xtream Information', value: [
                `Name: ${client.user.displayName} (\`${client.user.id}\`)`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`,
                `Name: ${client.user.displayName}`
              ].join('\n')
            }
          )
          .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ size: 4096 }) })
          .setColor(0x2c2d31)
          .setTimestamp();

        await interaction.reply({ embeds: [embeds], components: [raw] });
    }
  }
};