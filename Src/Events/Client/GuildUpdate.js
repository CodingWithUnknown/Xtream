const { Events, Client, AuditLogEvent, EmbedBuilder } = require('discord.js');
// const { MergeImages } = require('../../Models/Canvas');

module.exports = {
    name: Events.GuildUpdate,
    execute: async (client, oldGuild, newGuild) => {
        try {
            // const log = await Servers.getLogger(newGuild.id, logType.ServerUpdate);
            let test = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate, limit: 1 }).entries.first() // .executor.id
            console.log(test);

            let user = await client.users.fetch();

            // if (!log) return;
            const channel = newGuild.channels.cache.get('990186368237989948');
            if (!channel) return;
            const embeds = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                .setTitle(`<:up_n:1089775058026766377> Server Updated`)
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL({ size: 4096 }) }
                )
                .setColor(0x141318)
                .setTimestamp()
            let oldIcon = null;

            if (oldGuild.name !== newGuild.name) {
                embeds.addFields(
                    { name: 'Old Name', value: oldGuild.name, inline: true },
                    { name: 'New Name', value: newGuild.name, inline: true },
                )
            }
            /* if (oldGuild.iconURL() !== newGuild.iconURL()) {
                oldIcon = await MergeImages(oldGuild.iconURL(), newGuild.iconURL());
                embeds.setDescription(`Updated Icon: [Old Icon](${oldGuild.iconURL()}) | [New Icon](${newGuild.iconURL()})`)
                    .setImage(`attachment://image.png`)
            }
            if (oldGuild.bannerURL() !== newGuild.bannerURL()) {
                oldIcon = await MergeImages(oldGuild.bannerURL(), newGuild.bannerURL());
                embeds.setDescription(`Updated Banner: [Old Icon](${oldGuild.bannerURL()}) | [New Icon](${newGuild.bannerURL()})`)
                    .setImage(`attachment://image.png`)
            }
            if (oldGuild.splashURL() !== newGuild.splashURL()) {
                oldIcon = await MergeImages(oldGuild.splashURL(), newGuild.splashURL());
                embeds.setDescription(`Updated Splash: [Old Icon](${oldGuild.splashURL()}) | [New Icon](${newGuild.splashURL()})`)
                    .setImage(`attachment://image.png`)
            }
            if (oldGuild.discoverySplashURL() !== newGuild.discoverySplashURL()) {
                oldIcon = await MergeImages(oldGuild.discoverySplashURL(), newGuild.discoverySplashURL());
                embeds.setDescription(`Updated Discovery Splash: [Old Icon](${oldGuild.discoverySplashURL()}) | [New Icon](${newGuild.discoverySplashURL()})`)
                    .setImage(`attachment://image.png`)
            } */
            if (oldGuild.description !== newGuild.description) {
                embeds.addFields(
                    { name: 'Old Description', value: oldGuild.description, inline: true },
                    { name: 'New Description', value: newGuild.description, inline: true },
                )
            }
            if (oldGuild.ownerId !== newGuild.ownerId) {
                embeds.addFields(
                    { name: 'Old Owner', value: `<@${oldGuild.ownerId}>\`(${oldGuild.ownerId})\``, inline: true },
                    { name: 'New Owner', value: `<@${newGuild.ownerId}>\`(${newGuild.ownerId})\``, inline: true },
                )
            }
            if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
                embeds.addFields(
                    { name: 'Old Vanity URL', value: `https://discord.gg/${oldGuild.vanityURLCode}`, inline: true },
                    { name: 'New Vanity URL', value: `https://discord.gg/${newGuild.vanityURLCode}`, inline: true },
                )
            }
            if (oldGuild.afkChannelId !== newGuild.afkChannelId) {
                embeds.addFields(
                    { name: 'Old AFK Channel', value: `<#${oldGuild.afkChannelId}>\`(${oldGuild.afkChannelId})\``, inline: true },
                    { name: 'New AFK Channel', value: `<#${newGuild.afkChannelId}>\`(${newGuild.afkChannelId})\``, inline: true },
                )
            }
            if (oldGuild.systemChannelId !== newGuild.systemChannelId) {
                embeds.addFields(
                    { name: 'Old System Channel', value: `<#${oldGuild.systemChannelId}>\`(${oldGuild.systemChannelId})\``, inline: true },
                    { name: 'New System Channel', value: `<#${newGuild.systemChannelId}>\`(${newGuild.systemChannelId})\``, inline: true },
                )
            }
            if (oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
                embeds.addFields(
                    { name: 'Old Rules Channel', value: `<#${oldGuild.rulesChannelId}>\`(${oldGuild.rulesChannelId})\``, inline: true },
                    { name: 'New Rules Channel', value: `<#${newGuild.rulesChannelId}>\`(${newGuild.rulesChannelId})\``, inline: true },
                )
            }
            if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId) {
                embeds.addFields(
                    { name: 'Old Public Updates Channel', value: `<#${oldGuild.publicUpdatesChannelId}>\`(${oldGuild.publicUpdatesChannelId})\``, inline: true },
                    { name: 'New Public Updates Channel', value: `<#${newGuild.publicUpdatesChannelId}>\`(${newGuild.publicUpdatesChannelId})\``, inline: true },
                )
            }
            if (oldGuild.preferredLocale !== newGuild.preferredLocale) {
                embeds.addFields(
                    { name: 'Old Preferred Locale', value: oldGuild.preferredLocale, inline: true },
                    { name: 'New Preferred Locale', value: newGuild.preferredLocale, inline: true },
                )
            }

            if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
                embeds.addFields(
                    { name: 'Old Verification Level', value: `${oldGuild.verificationLevel}`, inline: true },
                    { name: 'New Verification Level', value: `${newGuild.verificationLevel}`, inline: true },
                )
            }
            if (oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) {
                embeds.addFields(
                    { name: 'Old Explicit Content Filter', value: `${oldGuild.explicitContentFilter}`, inline: true },
                    { name: 'New Explicit Content Filter', value: `${newGuild.explicitContentFilter}`, inline: true },
                )
            }
            if (oldGuild.mfaLevel !== newGuild.mfaLevel) {
                embeds.addFields(
                    { name: 'Old MFA Level', value: `${oldGuild.mfaLevel}`, inline: true },
                    { name: 'New MFA Level', value: `${newGuild.mfaLevel}`, inline: true },
                )
            }
            if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
                embeds.addFields(
                    { name: 'Old Default Message Notifications', value: `${oldGuild.defaultMessageNotifications}`, inline: true },
                    { name: 'New Default Message Notifications', value: `${newGuild.defaultMessageNotifications}`, inline: true },
                )
            }
            if (oldGuild.premiumTier !== newGuild.premiumTier) {
                embeds.addFields(
                    { name: 'Old Premium Tier', value: `${oldGuild.premiumTier}`, inline: true },
                    { name: 'New Premium Tier', value: `${newGuild.premiumTier}`, inline: true },
                )
            }
            if (oldGuild.premiumSubscriptionCount !== newGuild.premiumSubscriptionCount) {
                embeds.addFields(
                    { name: 'Old Premium Subscription Count', value: `${oldGuild.premiumSubscriptionCount}`, inline: true },
                    { name: 'New Premium Subscription Count', value: `${newGuild.premiumSubscriptionCount}`, inline: true },
                )
            }

            if (channel) {
                let arry = []
                if (oldIcon) arry.push(oldIcon)
                await channel.send({ embeds: [embeds], files: arry });
            }
        } catch (err) {
            console.log(err);
        }
    }
};