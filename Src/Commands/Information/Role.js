const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Shows information for the mentioned role')
    .addSubcommand((options) => options
      .setName('information')
      .setDescription('Shows information about this server')
      .addRoleOption((options) => options
        .setName('info')
        .setDescription('Mention a role from information for')
        .setRequired(true)
      )
    ),
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'information':
        let role = interaction.guild.roles.cache.get(interaction.options.getRole('info').id);

        const embeds = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setThumbnail(role.iconURL)
          .addFields(
            {
              name: 'General Information', value: [
                `**Name:** ${role.name}`,
                `**ID:** \`${role.id}\``,
                `**Position:** ${role.rawPosition}`,
                `**Hex Code:** ${role.hexColor}`,
                `**Role Created:** <t:${parseInt(role.createdTimestamp / 1000)}:F> (<t:${parseInt(role.createdAt / 1000)}:R>)`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: 'Role Configuration', value: [
                `**Hoist:** ${role.hoist ? 'Yes' : 'No'}`,
                `**Mentionable:** ${role.mentionable ? 'Yes' : 'No'}`,
                `**Manageable:** ${role.managed ? 'Yes' : 'No'}`,
                `**Total Permissions:** ${role.permissions.toArray().length}`
              ].join('\n')
            }
          )
          .addFields(
            { name: 'Allowed Permissions', value: `${role.permissions.toArray().map((x) => `\`${x}\``).join(' | ') ? `${role.permissions.toArray().slice(0, 15).map((x) => `\`${x}\``).join(' | ')} *more then ${role.permissions.toArray().length - 15}*` : 'None'}` }
          )
          .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setColor(`${role.hexColor ?? 0x2c2d31}`)
          .setTimestamp();
        return await interaction.reply({ embeds: [embeds] });
    }
  }
};