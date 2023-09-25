const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
    name: Events.ChannelDelete,
    execute: async (client, channel) => {
        await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete, limit: 1 }).then(async () => {
            const user = await client.users.fetch(audit.entries.first().executor.id);
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

            let channels = await channel.guild.channels.cache.get('990186368237989948');

            const embed = new EmbedBuilder()
                .setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` }
                )
                .setDescription(`<:delete:1088764990938427423> ${type[channel.type]} Deleted **${channel.name}**`)
                .addFields(
                    { name: 'Channel', value: `${channel.toString()} \`${channel.id.toString()}\``, inline: true },
                    { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp();
            await channels.send({ embeds: [embed] });
        });
    }
};