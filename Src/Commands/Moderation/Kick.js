const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the guild')
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
  execute: async (client, interaction) => {
    let target = interaction.options.getUser('user'),
      reason = interaction.options.getString('reason') ?? 'Not specified';

    if (!target) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xara Defender', iconURL: client.user.displayAvatarURL() }
        )
        .setDescription('This user does not exist in the server')
        .setFooter(
          { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.member.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xara Defender', iconURL: client.user.displayAvatarURL() }
        )
        .setDescription('You cannot timeout yourself.')
        .setFooter(
          { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (client.user.id.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xara Defender', iconURL: client.user.displayAvatarURL() }
        )
        .setDescription('You cannot timeout myself!')
        .setFooter(
          { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (interaction.guild.ownerId.includes(target.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xara Defender', iconURL: client.user.displayAvatarURL() }
        )
        .setDescription('You cannnot timeout the guild owner.')
        .setFooter(
          { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(confirm, cancel);

    const embeds = new EmbedBuilder()
      .setAuthor(
        { name: 'Xara Defender', iconURL: client.user.displayAvatarURL() }
      )
      .setDescription(`Are you sure you want to kick ${target} for reason: **${reason}**?`)
      .setFooter(
        { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
      )
      .setColor(0x2c2d31)
      .setTimestamp();

    let response = await interaction.reply({ embeds: [embeds], components: [row] });

    try {
      let confirmation = await response.awaitMessageComponent({ filter: (x) => x.user.id === interaction.user.id, time: 60_000 });

      switch (confirmation.customId) {
        case 'confirm':
          await target.kick({ reason: reason }).then(async () => {
            const embeds = new EmbedBuilder()
              .setAuthor(
                { name: 'Xara Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .setDescription([
                `${target.globalName} have been **Kicked** from this server`,
                `\nReason: ${reason}`,
              ].join('\n'))
              .setFooter(
                { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .setColor(0x2c2d31)
              .setTimestamp()
            return await confirmation.update({ embeds: [embeds], components: [] });
          }).catch((err) => {
            interaction.reply({ content: 'Could not kick user due to an uncommon error.' });
          });
          break;
        case 'cancel':
          await confirmation.update({ content: 'Action cancelled', components: [] });
          break;
      }
    } catch (e) {
      await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }
  }
};