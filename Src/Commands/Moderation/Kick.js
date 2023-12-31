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
        .setDescription('<:Cross:1056294370913026089> This user does not exist in the server')
        .setColor(0x2c2d31)
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.member.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setDescription('<:Cross:1056294370913026089> You cannot kick yourself.')
        .setColor(0x2c2d31)
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (!target.kickable) {
      const embeds = new EmbedBuilder()
        .setDescription('<:Cross:1056294370913026089> This user is not kickable.')
        .setColor(0x2c2d31);
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (target.roles.highest.position > interaction.member.roles.highest.position) {
      const embeds = new EmbedBuilder()
        .setDescription('<:Cross:1056294370913026089> You cannot kick someone with a superior role than you.')
        .setColor(0x2c2d31);
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (client.user.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setDescription('<:Cross:1056294370913026089> You cannot kick myself!')
        .setColor(0x2c2d31)
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.guild.ownerId.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setDescription('<:Cross:1056294370913026089> You cannnot kick the guild owner.')
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
      .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
      .setDescription(`Are you sure you want to kick ${target} for reason: **${reason}**?`)
      .setColor(0x2c2d31);

    let response = await interaction.reply({ embeds: [embeds], components: [row] });

    try {
      let confirmation = await response.awaitMessageComponent({
        filter: (x) => {
          if (x.user.id === interaction.user.id) return true;
          else x.reply({ content: `Only **${interaction.user.displayName}** can use this button.`, ephemeral: true });
          return false;
        }, time: 60_000
      });

      switch (confirmation.customId) {
        case 'confirm':
          const embeds = new EmbedBuilder()
            .setDescription([
              `<:Verified:1056288905030283265> **${target.displayName}** have been kicked from this server`,
              `Reason: **${reason}**`,
            ].join('\n'))
            .setColor(0x2c2d31);
          await confirmation.update({ embeds: [embeds], components: [] }).then(async () => await target.kick({ reason: reason })).catch(async () => {
            return await confirmation.update({ content: '<:Cross:1056294370913026089> Could not kick user due to an uncommon error.', embeds: [], components: [] });
          });
          break;
        case 'cancel':
          await confirmation.update({ content: 'Action cancelled', embeds: [], components: [] });
          break;
      }
    } catch {
      return await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', embeds: [], components: [] });
    }
  }
};