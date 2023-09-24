const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.EmojiCreate,
    execute: async (client, emoji) => {
        try {
            const log = await Servers.getLogger(emoji.guild.id, logType.EmojiCreate);
            if (!log) return;
            const audit = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiCreate, limit: 1 });
            const entry = audit.entries.first();
            let user = await client.users.fetch(entry.executor.id);

            let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            const embed = client.embed()
                .setAuthor({ name: user.tag, iconURL: icon })
                .setTitle(`<:create:1089903750879133736> Emoji Created`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}> (\`${emoji.id}\`)`, inline: true },
                    { name: 'Name', value: `\`${emoji.name}\``, inline: true },
                    { name: 'Animated', value: `${emoji.animated ? 'Yes' : 'No'}`, inline: true },
                    { name: 'URL', value: `[Click Here](${emoji.url})`, inline: true },
                    { name: 'Created Time', value: `<t:${Math.floor(emoji.createdTimestamp / 1000)}:R> - (<t:${Math.floor(emoji.createdTimestamp / 1000)}>)`, inline: true }
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
                .setTimestamp();

            await channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err);
        }
    }
}