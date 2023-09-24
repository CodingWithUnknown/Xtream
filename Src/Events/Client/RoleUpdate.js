const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.RoleUpdate,
    execute: async (client, oldRole, newRole) => {
        try {
            // const log = await Servers.getLogger(oldRole.guild.id, logType.RoleUpdate);
            // if (!log) return;
            const audit = await oldRole.guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate, limit: 1 });
            const entry = audit.entries.first();
            let user = await this.client.users.fetch(entry.executor.id);

            let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            if (oldRole.name !== newRole.name) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Name Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Name', value: `\`${oldRole.name}\``, inline: true },
                        { name: 'New Name', value: `\`${newRole.name}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }
            if (oldRole.color !== newRole.color) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Color Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Color', value: `\`#${oldRole.color.toString(16)}\``, inline: true },
                        { name: 'New Color', value: `\`#${newRole.color.toString(16)}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }
            if (oldRole.hoist !== newRole.hoist) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Hoist Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Hoist', value: `\`${oldRole.hoist}\``, inline: true },
                        { name: 'New Hoist', value: `\`${newRole.hoist}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }
            if (oldRole.mentionable !== newRole.mentionable) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Mentionable Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Mentionable', value: `\`${oldRole.mentionable}\``, inline: true },
                        { name: 'New Mentionable', value: `\`${newRole.mentionable}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }
            if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Permissions Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Permissions', value: `\`${new PermissionsBitField(oldRole.permissions.bitfield).toArray().join(', ') || 'None'}\``, inline: true },
                        { name: 'New Permissions', value: `\`${new PermissionsBitField(newRole.permissions.bitfield).toArray().join(', ') || 'None'}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }
            if (oldRole.rawPosition !== newRole.rawPosition) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setTitle(`<:up_n:1089775058026766377> Role Position Updated`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Role', value: `<@&${oldRole.id}> (\`${oldRole.id}\`)`, inline: true },
                        { name: 'Old Position', value: `\`${oldRole.rawPosition}\``, inline: true },
                        { name: 'New Position', value: `\`${newRole.rawPosition}\``, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }

        } catch (err) {
            console.log(err);
        }
    }
}