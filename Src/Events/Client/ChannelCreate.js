const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ChannelCreate,
    execute: async (client, channel) => {
        try {
            // const log = await Servers.getLogger(channel.guildId, logType.ChannelCreate);
            // if (!log) return;
            const regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;

            const audit = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate, limit: 1 });
            const entry = audit.entries.first();
            const user = await client.users.fetch(entry.executor.id);
            const cnType = {
                0: 'Text Channel',
                2: 'Voice Channel',
                4: 'Category',
                13: 'Stage Channel',
                5: 'Announcement Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                12: 'Private Thread Channel',
                11: 'Public Thread Channel',
                10: 'News Thread Channel',
            }
            const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            const embed = new EmbedBuilder()
                .setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: icon }
                )
                .setDescription(`<:create:1089903750879133736> ${cnType[channel.type]} Created **${channel.name}**`)
                .addFields(
                    { name: 'Channel', value: `${channel.toString()} \`${channel.id.toString()}\``, inline: true },
                    { name: 'Created Time', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(channel.createdTimestamp / 1000)}>)`, inline: true },

                )
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp();
            await ClientLogger.sendWebhook(client, channel.guildId, log.textId, {
                embeds: [embed]
            });
        } catch (err) {
            console.log(err)
        }
    }
}