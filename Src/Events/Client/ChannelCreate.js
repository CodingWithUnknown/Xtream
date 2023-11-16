const { Events, AuditLogEvent, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: Events.ChannelCreate,
    execute: async (client, channel) => {
        await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate }).then(async (audit) => {
            let user = await client.users.fetch(audit.entries.first().executor.id);
            let regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;

            let type = {
                0: 'Text Channel (Default)',
                2: 'Voice Channel',
                4: 'Category',
                5: 'Announcement Channel',
                10: 'News Thread Channel',
                11: 'Public Thread Channel',
                12: 'Private Thread Channel',
                13: 'Stage Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                16: 'Media Channel'
            };

            let channels = await channel.guild.channels.cache.get('990186368237989948');

            const raw = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Go to Channel')
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://discord.com/channels/${channel.guildId}/${channel.id}`)
                )

            const embeds = new EmbedBuilder()
                .setTitle('<:CreateChannel:1157204775364988950> Channel Create')
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                .setDescription([
                    `<:Right_Icon:1156641305770860646> **Responsible:** ${user.id.toString()} \`${user.id}\``,
                    `<:Right_Icon:1156641305770860646> **Target:** ${channel.toString()} \`${channel.id}\``,
                    `<:Right_Icon:1156641305770860646> <t:${Math.floor(channel.createdTimestamp / 1000)}:F>`
                ].join('\n'))
                .addFields(
                    {
                        name: 'Settings', value: [
                            `<:Right_Icon:1156641305770860646> **Name:** ${channel.name}`,
                            `<:Right_Icon:1156641305770860646> **Type** ${type[channel.type]}`,
                            `<:Right_Icon:1156641305770860646> **NSFW:** ${channel.nsfw ? 'Yes' : 'No'}`,
                            `<:Right_Icon:1156641305770860646> **Rate Limit Par User:** ${channel.rateLimitPerUser ? channel.rateLimitPerUser : 'Default'}`
                        ].join('\n')
                    }
                )
                .setColor(Colors.Green);

            await channels.send({ embeds: [embeds], components: [raw] });
        });
    }
};