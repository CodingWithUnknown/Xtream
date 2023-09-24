const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ChannelDelete,
    execute: async (client, channel) => {
        try {
            // const log = await Servers.getLogger(channel.guildId, logType.ChannelDelete);
            // if (!log) return;

            const regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;
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
            const audit = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete, limit: 1 });
            const entry = audit.entries.first();
            const user = await client.users.fetch(entry.executor.id);

            const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            const embed = new EmbedBuilder()
                .setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: icon }
                )
                .setDescription(`<:delete:1088764990938427423> ${cnType[channel.type]} Deleted **${channel.name}**`)
                .addFields(
                    { name: 'Channel', value: `${channel.toString()} \`${channel.id.toString()}\``, inline: true },
                    { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp();
            await ClientLogger.sendWebhook(client, channel.guildId, log.textId, {
                embeds: [embed]
            });
        } catch (e) {
            this.client.logger.error(e);
        }
    }
}