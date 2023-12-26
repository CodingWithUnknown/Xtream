const { Events, AuditLogEvent, EmbedBuilder, GuildBanManager, Client } = require('discord.js');

module.exports = {
    name: Events.GuildBanAdd,
    /**
     * 
     * @param {Client} client 
     * @param {GuildBanManager} target 
     * @returns 
     */
    execute: async (client, target) => {
        try {
            if (target.partial) await target.fetch();
            if (target.user.partial) await target.user.fetch();
        } catch (err) {
            if (['Missing Permissions', 'Missing Access'].includes(err.message)) return;
            return client.logger.log(`Error fetching ban: ${err.message}`, 'error');
        }

        await target.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd, limit: 1 }).then(async (audit) => {
            const user = await client.users.fetch(audit.entries.first().executor.id);

            let channel = client.channels.cache.get('990186368237989948');

            const embed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                .setTitle(`<:ban:1089791204746592287> Member Banned`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Member', value: `<@${target.user.id}> (\`${target.user.id}\`)`, inline: true },
                    { name: 'Reason', value: target.reason ? target.reason : 'No reason provided', inline: true },
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
                .setTimestamp();
            await channel.send({ embeds: [embed] });
        });
    }
}