const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ChannelPinsUpdate,
    execute: async (client, channel) => {
        try {

            if (channel.type === ChannelType.DM) return;
            // const log = await Servers.getLogger(channel.guildId, logType.ChannelPinsUpdate);
            // if (!log) return;

            const regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;

            const massage = await channel.messages.fetch(channel.lastMessageId);
            const audit = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.MessagePin, limit: 1 });
            const entry = audit.entries.first();

            const user = await this.client.users.fetch(entry.executor.id);
            const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            const embeds = new EmbedBuilder()
                .setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: icon }
                )
                .setDescription(`📌 Pins Updated in **${channel.name}**`)
                .addFields(
                    { name: 'Channel', value: `${channel.toString()} \`${channel.id.toString()}\``, inline: true },
                    { name: 'Message', value: `[Jump to Message](${massage.url})`, inline: true },
                    { name: 'Message By', value: `${massage.author.toString()} \`${massage.author.id.toString()}\``, inline: true },
                    { name: 'Pinned Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor(0x141318)

            await channel.send({ embeds: [embeds] });
        } catch (error) {
            if (error) return;
        }
    }
}