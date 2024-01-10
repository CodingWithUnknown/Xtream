const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.EmojiDelete,
    execute: async (client, emoji) => {
        const log = await Servers.getLogger(emoji.guild.id, logType.EmojiDelete);
        if (!log) return;
        const audit = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiDelete, limit: 1 });
        const entry = audit.entries.first();
        let user = await client.users.fetch(entry.executor.id);

        let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        let channel = client.channels.cache.get('990186368237989948');

        const embed = new EmbedBuilder()
            .setAuthor(
                { name: user.tag, iconURL: icon }
            )
            .setTitle(`<:delete:1088764990938427423> Emoji Deleted`)
            .addFields(
                { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}> (\`${emoji.id}\`)`, inline: true },
                { name: 'Name', value: `\`${emoji.name}\``, inline: true },
                { name: 'Animated', value: `\`${emoji.animated ? 'Yes' : 'No'}\``, inline: true },
                { name: 'Created Time', value: `<t:${Math.floor(emoji.createdTimestamp / 1000)}:R> - (<t:${Math.floor(emoji.createdTimestamp / 1000)}>)`, inline: true },
                { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true }
            )
            .setFooter(
                { text: client.user.username, iconURL: client.user.displayAvatarURL() }
            )
            .setColor(0x141318)
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
}