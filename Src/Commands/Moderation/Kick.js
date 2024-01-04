const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the guild')
    .setDMPermission(false)
    .setNSFW(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((options) => options
      .setName('user')
      .setDescription('Mention the member you want to kick for')
      .setRequired(true)
    )
    .addStringOption((options) => options
      .setName('reason')
      .setDescription('Type reason you want to kick the member for')
      .setRequired(false)
    ),
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    let target = interaction.options.getMember('user'),
      reason = interaction.options.getString('reason') ?? 'Not specified';

    if (!target) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
        .setDescription('This user does not exist in the server')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.member.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
        .setDescription('You cannot timeout yourself.')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (client.user.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
        .setDescription('You cannot timeout myself!')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.guild.ownerId.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
        .setDescription('You cannnot timeout the guild owner.')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary)
      );

    const embeds = new EmbedBuilder()
      .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
      .setDescription(`Are you sure you want to kick ${target} for reason: **${reason}**?`)
      .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
      .setColor(0x2c2d31)
      .setTimestamp();

    let response = await interaction.reply({ embeds: [embeds], components: [row] });

    try {
      let confirmation = await response.awaitMessageComponent({ filter: (x) => x.user.id === interaction.user.id, time: 60_000 });

      switch (confirmation.customId) {
        case 'confirm':
          await target.kick({ reason: reason }).then(async () => {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setDescription([
                `${target.globalName} have been **Kicked** from this server`,
                `\nReason: ${reason}`,
              ].join('\n'))
              .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setColor(0x2c2d31)
              .setTimestamp();

            return await confirmation.update({ embeds: [embeds], components: [] });
          }).catch(async (err) => {
            return await interaction.reply({ content: 'Could not kick user due to an uncommon error.' });
          });
          break;
        case 'cancel':
          return await confirmation.update({ content: 'Action cancelled', embeds: [], components: [] });
      }
    } catch (err) {
      return await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }
  }
};