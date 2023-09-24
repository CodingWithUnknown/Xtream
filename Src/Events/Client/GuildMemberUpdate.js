const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberUpdate,
    execute: async (client, oldMember, newMember) => {
        if (oldMember.user.id ===  client.user.id) return
        if (oldMember.partial) return;
        const audit = await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberUpdate, limit: 1 });
        const entry = audit.entries.first();

        const user = await  client.users.fetch(entry.executor.id);
        const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;


        const rolesAdded = newMember.roles.cache.filter(x => !oldMember.roles.cache.get(x.id));
        const rolesRemoved = oldMember.roles.cache.filter(x => !newMember.roles.cache.get(x.id));

        let channel = client.channels.cache.get('990186368237989948');

        if (rolesAdded.size > 0) {
            // const log = await Servers.getLogger(newMember.guild.id, logType.MemberRoleAdd);
            // if (!log) return;
            const roleAddedString = [];
            for (const role of [...rolesAdded.values()]) {
                roleAddedString.push(role.id.toString());
            }
            const embed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: icon })
                .setTitle(`<:add_user:1089772543126290523> Member Role Added`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Member', value: `<@${newMember.id}>(\`${newMember.id}\`)`, inline: true },
                    { name: 'Role(s)', value: `<@&${roleAddedString.join('> , <@&')}>(\`${roleAddedString.join(', ')}\`)`, inline: true },
                    { name: 'Added Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>(<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter({ text:  client.user.username, iconURL:  client.user.displayAvatarURL({}) })
            await channel.send({ embeds: [embed] });

        }
        if (rolesRemoved.size > 0) {
            // const log = await Servers.getLogger(newMember.guild.id, logType.MemberRoleRemove);
            // if (!log) return;
            const roleRemovedString = [];
            for (const role of [...rolesRemoved.values()]) {
                roleRemovedString.push(role.id.toString());
            }
            const embed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: icon })
                .setTitle(`<:remove_user:1089772643416285244> Member Role Removed`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Member', value: `<@${newMember.id}>(\`${newMember.id}\`)`, inline: true },
                    { name: 'Role(s)', value: `<@&${roleRemovedString.join('> , <@&')}>(\`${roleRemovedString.join(', ')}\`)`, inline: true },
                    { name: 'Removed Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>(<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter({ text:  client.user.username, iconURL:  client.user.displayAvatarURL({}) })
            await channel.send({ embeds: [embed] });
        }
        if (oldMember.nickname !== newMember.nickname) {
            // const log = await Servers.getLogger(newMember.guild.id, logType.MembersNicknameUpdate);
            // if (!log) return;

            const embed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: icon })
                .setTitle(`<:edit:1089775740255473714> Member Nickname Changed`)
                .setDescription(`**Old Nickname:** ${oldMember.nickname ? oldMember.nickname : 'None'}\n**New Nickname:** ${newMember.nickname ? newMember.nickname : 'None'}`)
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Member', value: `<@${newMember.id}>(\`${newMember.id}\`)`, inline: true },
                    { name: 'Changed Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>(<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                )
                .setFooter({ text:  client.user.username, iconURL:  client.user.displayAvatarURL({}) })
            await channel.send({ embeds: [embed] });
        }
    }
}
