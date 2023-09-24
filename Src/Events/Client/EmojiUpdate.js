const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.EmojiUpdate,
    execute: async (oldEmoji, newEmoji) => {
        // const log = await Servers.getLogger(oldEmoji.guild.id, logType.EmojiUpdate);
        // if (!log) return;
        const audit = await oldEmoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiUpdate, limit: 1 });
        const entry = audit.entries.first();
        let user = await client.users.fetch(entry.executor.id);

        let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        let channel = client.channels.cache.get('990186368237989948');

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: icon })
            .setTitle(`<:up_n:1089775058026766377> Emoji Updated`)
            .setColor(0x2d2c31)
            .addFields(
                { name: 'Emoji', value: `<:${oldEmoji.name}:${oldEmoji.id}> (\`${oldEmoji.id}\`)`, inline: true },
                { name: 'Old Name', value: `\`${oldEmoji.name}\``, inline: true },
                { name: 'New Name', value: `\`${newEmoji.name}\``, inline: true },
                { name: 'Animated', value: `\`${oldEmoji.animated ? 'Yes' : 'No'}\``, inline: true },
                { name: 'Created Time', value: `<t:${Math.floor(oldEmoji.createdTimestamp / 1000)}:R> - (<t:${Math.floor(oldEmoji.createdTimestamp / 1000)}>)`, inline: true },
                { name: 'Updated Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true }
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
}