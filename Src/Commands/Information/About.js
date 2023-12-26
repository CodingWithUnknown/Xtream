const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { disk } = require('systeminformation');

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
        const embeds = new EmbedBuilder()
          .setAuthor({ name: `${client.users.cache.find((x) => x.id == process.env.DEVELOPER_OWNER).globalName}`, iconURL: client.users.cache.find((x) => x.id == process.env.DEVELOPER_OWNER).displayAvatarURL({ size: 4096 }) })
          .setTitle('__Official Bot Server Invite__')
          .setURL('https://discord.gg/VgT9u4PM2w')
          .setDescription('<:Waves:1055864282614595654> Hey there, I\'m Xtream Defender, the Higher Defense Bot for your Discord Server. I\m a Multi-purpose loaded with Higher Defending of many features like none other.')
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
          .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ extension: 'webp', size: 4096 }) })
          .setColor(0x2c2d31)
          .setTimestamp();

        await interaction.reply({ embeds: [embeds] });
    }
  }
};