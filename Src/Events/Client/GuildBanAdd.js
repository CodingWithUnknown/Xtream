const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildBanAdd,
    execute: async (client, ban) => {
        try {
            if (ban.partial) await ban.fetch();
            if (ban.user.partial) await ban.user.fetch();
        } catch (err) {
            if (['Missing Permissions', 'Missing Access'].includes(err.message)) return;
            return client.logger.log(`Error fetching ban: ${err.message}`, 'error');
        }
        const audit = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd, limit: 1 });
        const entry = audit.entries.first();
        const user = await client.users.fetch(entry.executor.id);

        const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        let channel = client.channels.cache.get('990186368237989948');

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: icon })
            .setTitle(`<:ban:1089791204746592287> Member Banned`)
            .setColor(0x2d2c31)
            .addFields(
                { name: 'Member', value: `<@${ban.user.id}> (\`${ban.user.id}\`)`, inline: true },
                { name: 'Reason', value: ban.reason ? ban.reason : 'No reason provided', inline: true },
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
            .setTimestamp();
        await channel.send({ embeds: [embed] });
    }
}