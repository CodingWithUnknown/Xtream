const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ComponentType } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides detailed information about all available commands.'),
  developer: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns
   */
  execute: async (client, interaction) => {
    const embeds = new EmbedBuilder()
      .setAuthor({ name: 'Help Panel', iconURL: client.user.displayAvatarURL() })
      .setDescription('More soons available')
      .setFooter({ text: 'Xtream Developers', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setColor(0x2d2c31)
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('Help Menu')
          .setCustomId('help_menu')
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions([
            {
              label: 'Home Panel',
              value: 'panel',
            }, {
              label: 'Information',
              value: 'info',
            }
          ])
      );

    let msg = await interaction.reply({ embeds: [embeds], components: [row] });

    const collector = msg.createMessageComponentCollector({
      filter: (x) => {
        if (x.user.id === interaction.user.id) return true;
        else {
          x.reply({
            ephemeral: true,
            content: `Only **${interaction.user.displayName}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      }, componentType: ComponentType.StringSelect, time: 15000
    });

    collector.on('collect', async (init) => {
      if (!init.deferred) init.deferUpdate();
      switch (init.values[0]) {
        case 'panel':
          if (!init) return;
          await init.edit({ embeds: [embeds], components: [row] });
          break;

        case 'info':
          if (!init) return;
          msg = new EmbedBuilder()
            .setTitle('Music Commands')
            .setDescription(client.commands.filter((x) => x.category && x.category === 'Information').map((x) => `\`${x.name}\``).join(', '))
            .setFooter({ text: `Total ${client.commands.filter((x) => x.category && x.category === 'Information').map((x) => `\`${x.name}\``).length} Music commands.` })
            .setColor(0x2d2c31);
          await init.edit({ embeds: [editEmbed], components: [row] });
      }
    });

    collector.on('end', async () => {
      if (!msg) return;
      return msg.edit({ embeds: [embeds], components: null });
    });
  }
};