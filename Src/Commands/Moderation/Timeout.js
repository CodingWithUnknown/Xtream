const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Adds timeout to a guild member')
    .setDMPermission(false)
    .setNSFW(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((options) => options
      .setName('add')
      .setDescription('Adds timeout to a guild member')
      .addUserOption((options) => options
        .setName('user')
        .setDescription('Mention the member you want to timeout for')
        .setRequired(true)
      )
      .addStringOption((options) => options
        .setName('duration')
        .setDescription('Set duration for a timeout for')
        .setRequired(true)
        .addChoices(
          { name: '30 Seconds', value: '30_000' },
          { name: '1 Minutes', value: '60_000' },
          { name: '2 Minutes', value: '120_000' },
          { name: '5 Minutes', value: '300_000' },
          { name: '10 Minutes', value: '600_000' },
          { name: '15 Minutes', value: '900_000' },
          { name: '20 Minutes', value: '1_200_000' },
          { name: '30 Minutes', value: '1_800_000' },
          { name: '45 Minutes', value: '2_700_000' },
          { name: '1 Hour', value: '3_600_000' },
          { name: '2 Hours', value: '7_200_000' },
          { name: '3 Hours', value: '10_800_000' },
          { name: '5 Hours', value: '18_000_000' },
          { name: '10 Hours', value: '36_000_000' },
          { name: '15 Hours', value: '54_000_000' },
          { name: '20 Hours', value: '72_000_000' },
          { name: '30 Hours', value: '108_000_000' },
          { name: '1 Day', value: '86_400_000' },
          { name: '2 Days', value: '172_800_000' },
          { name: '3 Days', value: '259_200_000' },
          { name: '5 Days', value: '432_000_000' },
          { name: 'One Week', value: '604_800_000' },
          { name: 'Two Weeks', value: '1_209_600_000' },
          { name: 'Three Weeks', value: '1_814_400_000' },
        )
      )
      .addStringOption((options) => options
        .setName('reason')
        .setDescription('Type reason you want to timeout the member for')
        .setRequired(false)
      )
    )
    .addSubcommand((options) => options
      .setName('remove')
      .setDescription('Removes timeout to a guild member')
      .addUserOption((options) => options
        .setName('user')
        .setDescription('Mention the member you want to timeout remove for')
        .setRequired(true)
      )
      .addStringOption((options) => options
        .setName('reason')
        .setDescription('Type reason you want to timeout remove the member for')
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
        let target = interaction.options.getMember('user'),
          duration = interaction.options.getString('duration'),
          specify = interaction.options.getString('reason') ?? 'None specified';

        if (!target) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('This user does not exist in the server')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.member.id.includes(target.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout yourself.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (client.user.id.includes(!target.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout myself!')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.guild.ownerId.includes(target.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannnot timeout the guild owner.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (!target.manageable && !target.moderatable) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('This user is not moderatable.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (target.roles.highest.rawPosition > interaction.member.roles.highest.rawPosition) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout someone with a superior role than you.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        const add = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setDescription(`<:Timeout:1056289049603756032> **${target.globalName}** has been timeout about \`${duration}\` for Reason: **${specify}**`)
          .setColor(0x2c2d31);
        await interaction.reply({ embeds: [add] }).then(async () => await target.timeout(duration, specify)).catch(async () => {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('Could not timeout user due to an encourage error.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        });
        break;
      case 'remove':
        let user = interaction.options.getMember('user'),
          reason = interaction.options.getString('reason') ?? 'None specified';

        if (interaction.member.id.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout remove yourself.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (!user.manageable && !user.moderatable) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL() })
            .setDescription('This user is not moderatable.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (client.user.id.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout **Xtream Defender**!')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (interaction.guild.ownerId.includes(user.id)) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannnot timeout the guild owner.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        if (user.roles.highest.position > interaction.member.roles.highest.position) {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('You cannot timeout remove someone with a superior role than you.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        const remove = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setDescription(`<:Timeout:1056289049603756032> **${user.displayName}** timeout has been removed.\n\nReason: **${reason}**`)
          .setColor(0x2c2d31);
        await interaction.reply({ embeds: [remove] }).then(async () => await user.timeout(null, reason)).catch(async () => {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setDescription('Could not timeout user due to an encourage error.')
            .setColor(0x2c2d31);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        });
        break;
    }
  }
};