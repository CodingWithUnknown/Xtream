const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
    name: Events.ChannelCreate,
    execute: async (client, channel) => {
        await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate, limit: 1 }).then(async (audit) => {
            let user = await client.users.fetch(audit.entries.first().executor.id);
            const regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;

            const type = {
                0: 'Text Channel',
                2: 'Voice Channel',
                4: 'Category',
                5: 'Announcement Channel',
                10: 'News Thread Channel',
                11: 'Public Thread Channel',
                12: 'Private Thread Channel',
                13: 'Stage Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                16: 'Media Channel',
            }

            let channels = await channel.guild.chanenl.cache.get('990186368237989948');

            const embeds = new EmbedBuilder()
                .setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` }
                )
                .setDescription(`<:create:1089903750879133736> ${type[channel.type]} Created **${channel.name}**`)
                .addFields(
                    { name: 'Channel', value: `${channel.toString()} \`${channel.id.toString()}\``, inline: true },
                    { name: 'Created Time', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(channel.createdTimestamp / 1000)}>)`, inline: true },

                )
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp();

                await channels.send({ embeds: [embeds] });
        });
    }
};