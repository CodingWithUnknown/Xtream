const { Events, AuditLogEvent, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: Events.ChannelDelete,
    execute: async (client, channel) => {
        await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(async (audit) => {
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
            }

            let channels = await channel.guild.channels.cache.get('990186368237989948');

            const embeds = new EmbedBuilder()
                .setTitle('<:DeleteChannel:1157204586331914240> Channel Delete')
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                .setDescription([
                    `<:Right_Icon:1156641305770860646> **Responsible:** <@${user.id}> \`${user.id}\``,
                    `<:Right_Icon:1156641305770860646> <t:${Math.floor(Date.now() / 1000)}:F>`
                ].join('\n'))
                .addFields(
                    {
                        name: 'Previous Settings', value: [
                            `<:Right_Icon:1156641305770860646> **Name:** ${channel.name} **[**\`${channel.id}\`**]**`,
                            `<:Right_Icon:1156641305770860646> **Type:** ${channel.nsfw ? 'Yes' : 'No'}`,
                            `<:Right_Icon:1156641305770860646> **NSFW:** ${type[channel.type]}`,
                            `<:Right_Icon:1156641305770860646> **Rate Limit Par User:** ${type[channel.type]}`
                        ].join('\n')
                    }
                )
                .setColor(Colors.Red);

            await channels.send({ embeds: [embeds] });
        });
    }
};