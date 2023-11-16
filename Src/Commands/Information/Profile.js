const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View information about central user')
    .addUserOption((options) => options
      .setName('user')
      .setDescription('Mention the member you want to check out for')
      .setRequired(false)
    ),
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute: async (client, interaction) => {
    let mention = interaction.options.getMember('user') ?? interaction.member;
    await interaction.deferReply();

    console.log(mention);

    if (!mention) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true }) })
        .setDescription('This user does not exist in the server')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true }), })
        .setColor(0x2c2d31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    let flags = {
      ActiveDeveloper: 'Active Developer',
      BotHTTPInteractions: 'Bot HTTP Interactions',
      BugHunterLevel1: 'Bug Hunter Level 1',
      BugHunterLevel2: 'Bug Hunter Level 2',
      CertifiedModerator: 'Discord Certified Moderator',
      HypeSquadOnlineHouse1: 'HypeSquad Bravery',
      HypeSquadOnlineHouse2: 'HypeSquad Brilliance',
      HypeSquadOnlineHouse3: 'HypeSquad Balance',
      Hypesquad: 'HypeSquad Events',
      Partner: 'Partnered Server',
      PremiumEarlySupporter: 'Early Nitro Supporter',
      Staff: 'Discord Employee',
      TeamPseudoUser: 'Team Pseudo User',
      VerifiedBot: 'Verified Bot',
      VerifiedDeveloper: 'Early Verified Bot Developer',
    };

    /* let position = new Promise((x) => {
      for (let i = 1; i < mention.guild.members.cache.sort((x, y) => x.joinedTimestamp - y.joinedTimestamp).length + 1; i++) {
        if (mention.guild.members.cache.sort((x, y) => x.joinedTimestamp - y.joinedTimestamp)[i - 1] === mention.user.id) x(i);
      }
    }); */

    if (mention.user.bot == true) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Profile Information', iconURL: client.user.displayAvatarURL({ size: 4096 }) })
        .setThumbnail(mention.user.displayAvatarURL({ size: 4096 }))
        .addFields([
          {
            name: 'Account Information', value: [
              `**Username:** ${mention.user.username} \`${mention.user.id}\``,
              `**Descriminatior:** ${mention.user.discriminator}`,
              `**Nickname:** ${mention.nickname ?? 'Not Added'}`,
              // `**Join Position:** ${await position}`,
              `**Bots:** ${mention.user.bot ? 'Yes' : 'No'}`,
              `**Suspicious:** ${mention.user.system ? 'Yes' : 'No'}`,
              `**Verified:** ${mention.user.verified ? 'Yes' : 'No'}`,
              `**MFA Enabled:** ${mention.user.mfaEnabled ? 'Yes' : 'No'}`,
              `**Discord Joined:** <t:${parseInt(mention.user.createdTimestamp / 1000)}:F> (<t:${parseInt(mention.user.createdTimestamp / 1000)}:R>)`,
              `**Server Joined:** <t:${parseInt(mention.joinedTimestamp / 1000)}:F> (<t:${parseInt(mention.joinedTimestamp / 1000)}:R>)`,
            ].join('\n')
          }
        ])
        .addFields(
          {
            name: 'Statistical Information', value: [
              `**Highest Role:** \`${interaction.guildId.includes(mention.roles.highest.id) ? mention.roles.highest.name : 'No Higher Roles'}\``,
              `**Display Role:** \`${mention.roles.hoist ? mention.roles.hoist.name : 'No Display Roles'}\``,
              `**Roles - [${mention.roles.cache.sort((x, y) => y.position - x.position).map((x) => x.toString()).slice(0, -1).length}]**\n${mention.roles.cache.sort((x, y) => y.position - x.position).map((x) => x.toString()).slice(0, -1).join(', ') ?? 'No Roles'}`
            ].join('\n')
          }
        )
        .addFields(
          { name: 'Badges', value: `${mention.user.flags.toArray().length ? mention.user.flags.toArray().map((x) => flags[x]).join('\n') : 'No Badges'}` }
        )
        .addFields(
          { name: 'Acknowledgements', value: `${interaction.guild.ownerId.includes(mention.user.id) ? 'Our Respectful Server Owner' : 'Our Respectful Server Member'}` }
        )
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp()
      return await interaction.reply({ embeds: [embeds] });
    } else {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Profile Information', iconURL: client.user.displayAvatarURL({ size: 4096 }) })
        .setThumbnail(mention.user.displayAvatarURL({ size: 4096 }))
        .addFields([
          {
            name: 'Account Information', value: [
              `**Username:** ${mention.user.username} \`${mention.user.id}\``,
              `**Display Name:** ${mention.user.displayName ?? 'Not Setup Yet'}`,
              `**Nickname:** ${mention.nickname ?? 'Not Added'}`,
              // `**Join Position:** ${await position}`,
              `**Bots:** ${mention.user.bot ? 'Yes' : 'No'}`,
              `**Suspicious:** ${mention.user.system ? 'Yes' : 'No'}`,
              `**Discord Joined:** <t:${parseInt(mention.user.createdTimestamp / 1000)}:F> (<t:${parseInt(mention.user.createdTimestamp / 1000)}:R>)`,
              `**Server Joined:** <t:${parseInt(mention.joinedTimestamp / 1000)}:F> (<t:${parseInt(mention.joinedTimestamp / 1000)}:R>)`,
            ].join('\n')
          }
        ])
        .addFields(
          {
            name: 'Statistical Information', value: [
              `**Highest Role:** \`${interaction.guildId.includes(mention.roles.highest.id) ? mention.roles.highest.name : 'No Higher Roles'}\``,
              `**Display Role:** \`${mention.roles.hoist ? mention.roles.hoist.name : 'No Display Roles'}\``,
              `**Roles - [${mention.roles.cache.sort((x, y) => y.position - x.position).map((x) => x.toString()).slice(0, -1).length}]**\n${mention.roles.cache.sort((x, y) => y.position - x.position).map((x) => x.toString()).slice(0, -1).join(', ') ?? 'No Roles'}`
            ].join('\n')
          }
        )
        .addFields(
          { name: 'Badges', value: `${mention.user.flags.toArray().length ? mention.user.flags.toArray().map((x) => flags[x]).join('\n') : 'No Badges'}` }
        )
        .addFields(
          { name: 'Acknowledgements', value: `${interaction.guild.ownerId.includes(mention.user.id) ? 'Our Respectful Server Owner' : 'Our Respectful Server Member'}` }
        )
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ size: 4096 }) })
        .setColor(0x2c2d31)
        .setTimestamp();

      return await interaction.reply({ embeds: [embeds] });
    }
  }
};