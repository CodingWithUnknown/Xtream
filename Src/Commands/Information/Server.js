const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ChannelType, } = require('discord.js');
const ms = require('ms');
const { Capitalize } = require('../../Models/Module');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Shows information about this server')
    .addSubcommand((options) => options
      .setName('information')
      .setDescription('Shows information about this server')
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
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        interaction.guild.emojis.cache.forEach((x) => {
          OverallEmojis++;
          if (x.animated) {
            Animated++;
            EmojisAnimated += client.emojis.cache.get(x.id).toString();
          } else {
            EmojiCount++;
            Emojis += client.emojis.cache.get(x.id).toString();
          }
        });

        let VerificationLevel = {
          0: 'None',
          1: 'Low',
          2: 'Medium',
          3: '(╯°□°）╯︵ ┻━┻ (High)',
          4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻ (Highest)'
        },
          DefaultNotifications = {
            0: 'All Messages',
            1: 'Only Mentions'
          },
          ExplicitContentFilter = {
            0: 'Disabled',
            1: 'Members Without Roles',
            2: 'All Members'
          },
          MFALevel = {
            0: 'None',
            1: 'Elevated'
          },
          NSFWLevel = {
            0: 'Default',
            1: 'Explicit',
            2: 'Safe',
            3: 'AgeRestricted'
          },
          PremiumTier = {
            0: 'None',
            1: 'Tier1',
            2: 'Tier2',
            3: 'Tier3'
          },
          Boolean = {
            true: '<:Verified:1056288905030283265> Yes',
            false: '<:Cross:1056294370913026089> No'
          }

          console.log(interaction.guild);

        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ extension: 'webp', size: 4096 }) }
          )
          .setTitle(`${interaction.guild.name} Information`)
          .setThumbnail(interaction.guild.iconURL({ extension: 'webp', size: 4096 }))
          .setDescription(interaction.guild.description ? `*${interaction.guild.description}*` : null)
          .addFields(
            {
              name: '__General Information__', value: [
                `**Name:** ${interaction.guild.name} (${interaction.guildId})`,
                `**Owner Name:** <@${interaction.guild.ownerId}> (${interaction.guild.ownerId})`,
                `**Available:** ${Boolean[interaction.guild.available]}`,
                `**Server Longest:** ${Boolean[interaction.guild.large]}`,
                `**Notification:** ${DefaultNotifications[interaction.guild.defaultMessageNotifications]}`,
                `**Preferred Locale:** ${interaction.guild.preferredLocale}`,
                `**Server Created:** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:F> (<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>)`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: '__Members Information__', value: [
                `**Total:** ${interaction.guild.memberCount}`,
                `**Members:** ${interaction.guild.members.cache.filter((x) => !x.user.bot).size}`,
                `**Bots:** ${interaction.guild.members.cache.filter((x) => x.user.bot).size}`,
                `**Maximum Members:** ${interaction.guild.maximumMembers}`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: '__Roles Information__', value: [
                `**Total Roles:** ${interaction.guild.roles.cache.size}`,
                `**Administrator Roles:** ${interaction.guild.members.cache.filter((x) => x.user)}`,
                // `**Moderation Roles:** ${}`,
                // `**Highest Position:** ${}`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: '__Channels Information__', value: [
                `**Total:** ${interaction.guild.channels.cache.size}`,
                `**Channels:** <:Icons_channel:1056294088401498132> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildText).size} | <:IconVoice:1107178469986680933> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildVoice).size} | <:Room_icon_Stage:1107178612194549761> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildStageVoice).size} | <:icon_17:1107204158030876733> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildAnnouncement && ChannelType.AnnouncementThread).size} | <:icons_thread:1107179197820059680> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.PublicThread && ChannelType.PrivateThread).size} | <:icons_forum:1056289560755191838> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildForum).size} | <:icons_category:1107303566181421206> ${interaction.guild.channels.cache.filter((x) => x.type == ChannelType.GuildCategory).size}`,
                `**AFK Channel:** ${interaction.guild.channels.cache.get(interaction.guild.afkChannelId) ?? 'None'} (${ms(interaction.guild.afkTimeout, { long: true })})`,
                `**System Channel** ${interaction.guild.channels.cache.get(interaction.guild.systemChannelId) ?? 'None'}`,
                `**Rules Channel:** ${interaction.guild.channels.cache.get(interaction.guild.rulesChannelId) ?? 'None'}`,
                `**Public Updates Channel** ${interaction.guild.channels.cache.get(interaction.guild.publicUpdatesChannelId) ?? 'None'}`,
                `**Safety Alerts Channel** ${interaction.guild.channels.cache.get(interaction.guild.safetyAlertsChannelId) ?? 'None'}`
              ].join('\n')
            }
          )
          /* .addFields(
            {
              name: '__Emojis & Stickers__', value: [
                `**Total:** ${interaction.guild.emojis.cache.size}`,
                `**Standard:** `,
                `**Animated:** ${interaction.guild.emojis.cache.forEach((x) => x.animated).size}`
              ].join('\n')
            }
          ) */
          .addFields(
            {
              name: '__Security Level__', value: [
                `**NSFW Level:** ${NSFWLevel[interaction.guild.nsfwLevel]}`,
                `**MFA Level:** ${MFALevel[interaction.guild.mfaLevel]}`,
                `**Verification Level:** ${VerificationLevel[interaction.guild.verificationLevel]}`,
                `**Explicit Content Filter:** ${ExplicitContentFilter[interaction.guild.explicitContentFilter]}`
              ].join('\n')
            }
          )
          .addFields(
            {
              name: '__Boosts Information__', value: [
                `**Premium Tier:** ${PremiumTier[interaction.guild.premiumTier]}`,
                `**Premium Subscription Count:** ${interaction.guild.premiumSubscriptionCount}`,
                `**Premium Progress Bar:** ${Boolean[interaction.guild.premiumProgressBarEnabled]}`
              ].join('\n')
            }
          )
          .addFields(
            { name: '__Server Features__', value: `${'<:Verified:1056288905030283265>: ' + Capitalize(interaction.guild.features.join('\n<:Verified:1056288905030283265>: ').replace(/_/g, ' '))}` }
          )
          .setFooter(
            { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ extension: 'webp', size: 4096 }) }
          )
          .setColor(0x2c2d31)
          .setTimestamp()
        return await interaction.reply({ embeds: [embeds] });
    }
  }
};