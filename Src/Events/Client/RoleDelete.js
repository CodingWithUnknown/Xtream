const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.RoleDelete,
    execute: async (client, role) => {
        try {
            // const log = await Servers.getLogger(role.guild.id, logType.RoleDelete);
            // if (!log) return;
            const audit = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete, limit: 1 });
            const entry = audit.entries.first();
            let user = await client.users.fetch(entry.executor.id);

            let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            const embed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: icon })
                .setTitle(`<:delete:1088764990938427423> Role Deleted`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Role', value: `<@&${role.id}> (\`${role.id}\`)`, inline: true },
                    { name: 'Role Color', value: `\`#${role.color.toString(16)}\``, inline: true },
                    { name: 'Create Time', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R> (<t:${Math.floor(role.createdTimestamp / 1000)}>)`, inline: true },
                    { name: 'Delete Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true }
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            await channel.send({ embeds: [embed] });
        } catch (err) {
            if (err) return;
        }
    }
}