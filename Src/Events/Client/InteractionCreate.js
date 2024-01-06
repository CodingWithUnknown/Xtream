const { Client, Events, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Suspension = require('../../Models/Schema/Suspension');

module.exports = {
  name: Events.InteractionCreate,
  /**
   * 
   * @param {Client} client 
   * @param {import('discord.js').Interaction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      let commands = await client.commands.get(interaction.commandName);
      if (!commands) {
        const embeds = new EmbedBuilder()
          .setDescription('This (/) command is outdated.')
          .setColor(0x2d2c31);
        return await interaction.reply({ embeds: [embeds], ephemeral: true });
      }

      await Suspension.findOne({ User: interaction.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You have been Suspended from Xtream Developers.')
            .setColor(0x2d2c31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }
      });

      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.ViewChannel && PermissionFlagsBits.SendMessages)) return;
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) return await interaction.reply({ content: `I don't have \`EmbedLinks\` permission to use this command.`, ephemeral: true });

      if (commands.developer && !client.developer.includes(interaction.user.id)) {
        const embeds = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setDescription('This command can only be Managed or Executed by the [Developer](https://discord.com/users/770887288464867338).')
          .setColor(0x2d2c31);
        return await interaction.reply({ embeds: [embeds], ephemeral: true });
      }

      try {
        await commands.execute(client, interaction);
      } catch (err) {
        client.logger.error(err);
        if (interaction.replied || interaction.deferred) {
          if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) {
            return await interaction.followUp({ content: 'There was an error executing that command.', ephemeral: true });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setDescription('There was an error executing that command.')
              .setColor(0x2d2c31);
            return await interaction.followUp({ embeds: [embeds], ephemeral: true });
          }
        } else {
          if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) {
            return await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setDescription('There was an error executing that command.')
              .setColor(0x2d2c31);
            return await interaction.reply({ embeds: [embeds], ephemeral: true });
          }
        }
      }
    }
  }
};