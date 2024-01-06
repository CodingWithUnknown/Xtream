const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the guild')
    .setDMPermission(false)
    .setNSFW(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addSubcommand((options) => options
      .setName('add')
      .setDescription('Ban a member from the guild')
      .addUserOption((options) => options
        .setName('user')
        .setDescription('Mention the member you want to Ban for')
        .setRequired(true)
      )
      .addStringOption((options) => options
        .setName('reason')
        .setDescription('Type reason you want to Ban the member for')
        .setRequired(false)
      )
    )
    .addSubcommand((options) => options
      .setName('remove')
      .setDescription('Unban a member from the guild')
      .addUserOption((options) => options
        .setName('user')
        .setDescription('Mention the member you want to Unban for')
        .setRequired(true)
      )
      .addStringOption((options) => options
        .setName('reason')
        .setDescription('Type reason you want to Unban the member for')
        .setRequired(false)
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
      case 'add':
        let target = interaction.options.getUser('user'),
          reason = interaction.options.getString('reason') ?? 'Not specified';

        if (!target) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> This user does not exist in the server')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.member.id.includes(target.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannot timeout yourself.')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (client.user.id.includes(target.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannot timeout myself!')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.guild.ownerId.includes(target.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannnot timeout the guild owner.')
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
              await interaction.guild.members.ban(user, { reason: reason }).then(async () => {
                const embeds = new EmbedBuilder()
                  .setDescription([
                    `<:Verified:1056288905030283265> **${target.displayName}** have been banned from this server`,
                    `Reason: **${reason}**`,
                  ].join('\n'))
                  .setColor(0x2c2d31);
                return await confirmation.update({ embeds: [embeds], components: [] });
              }).catch(async () => {
                return await confirmation.update({ content: '<:Cross:1056294370913026089> Could not ban user due to an uncommon error.', embeds: [], components: [] });
              });
              break;
            case 'cancel':
              return await confirmation.update({ content: 'Action cancelled', embeds: [], components: [] });
          }
        } catch {
          return await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', embeds: [], components: [] });
        }
        break;
      case 'remove':
        let user = interaction.options.getUser('user'),
          reasons = interaction.options.getString('reason') ?? 'Not specified';

        if (!user) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> This user does not exist in the server')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.member.id.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannot timeout yourself.')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (client.user.id.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannot timeout myself!')
            .setColor(0x2c2d31)
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.guild.ownerId.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setDescription('<:Cross:1056294370913026089> You cannnot timeout the guild owner.')
            .setColor(0x2c2d31)
            .setTimestamp();
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        const rows = new ActionRowBuilder()
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

        const remove = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setDescription(`Are you sure you want to kick ${user} for reason: **${reasons}**?`)
          .setColor(0x2c2d31);

        let responses = await interaction.reply({ embeds: [remove], components: [rows] });

        try {
          let confirmation = await responses.awaitMessageComponent({
            filter: (x) => {
              if (x.user.id === interaction.user.id) return true;
              else x.reply({ content: `Only **${interaction.user.displayName}** can use this button.`, ephemeral: true });
              return false;
            }, time: 60_000
          });

          switch (confirmation.customId) {
            case 'confirm':
              await interaction.guild.members.unban(user, { reason: reasons }).then(async () => {
                const embeds = new EmbedBuilder()
                  .setDescription([
                    `<:Verified:1056288905030283265> **${user.displayName}** have been Unbanned from this server`,
                    `Reason: **${reasons}**`,
                  ].join('\n'))
                  .setColor(0x2c2d31);
                return await confirmation.update({ embeds: [embeds], components: [] });
              }).catch(async () => {
                return await confirmation.update({ content: '<:Cross:1056294370913026089> Could not ban user due to an uncommon error.', embeds: [], components: [] });
              });
              break;
            case 'cancel':
              return await confirmation.update({ content: 'Action cancelled', embeds: [], components: [] });
          }
        } catch {
          return await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', embeds: [], components: [] });
        }
        break;
    }
  }
};