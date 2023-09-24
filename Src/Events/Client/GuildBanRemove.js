const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildBanRemove,
    execute: async (client, ban) => {
        try {
            if (ban.user.partial) await ban.user.fetch();
        } catch (err) {
            if (['Missing Permissions', 'Missing Access'].includes(err.message)) return;
            return client.logger.log(`Error fetching ban: ${err.message}`, 'error');
        }

        // const log = await Servers.getLogger(ban.guild.id, logType.MemberUnban);
        // if (!log) return;

        const audit = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanRemove, limit: 1 });
        const entry = audit.entries.first();
        const user = await client.users.fetch(entry.executor.id);

        const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        let channel = client.channels.cache.get('990186368237989948');

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: icon })
            .setTitle(`<:ban:1089791204746592287> Member Unbanned`)
            .setColor(0x2d2c31)
            .addFields(
                { name: 'Member', value: `<@${ban.user.id}> (\`${ban.user.id}\`)`, inline: true },
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();
        await channel.send({ embeds: [embed] });
    }
}