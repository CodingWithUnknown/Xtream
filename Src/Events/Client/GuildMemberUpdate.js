const { Events, AuditLogEvent, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: Events.GuildMemberUpdate,
    execute: async (client, oldMember, newMember) => {
        if (oldMember.user.id === client.user.id) return
        if (oldMember.partial) return;
        await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate, limit: 1 }).then(async (audit) => {
            let user = await client.users.fetch(audit.entries.first().executor.id);


            console.log('--------------------------------');
            console.log(oldMember);
            console.log('--------------------------------');
            console.log(newMember);
            console.log('--------------------------------');
            console.log(audit);
            console.log('--------------------------------');
            console.log(user);
            console.log('--------------------------------');

            let channel = client.channels.cache.get('990186368237989948');

            if (newMember.roles.cache.filter((x) => oldMember.roles.cache.get(x.id)).size && oldMember.roles.cache.filter((x) => newMember.roles.cache.get(x.id)).size > 0) {
                let roleAddedString = [];
                let roleRemovedString = [];
                for (let role of [...newMember.roles.cache.filter((x) => !oldMember.roles.cache.get(x.id)).values()]) {
                    roleAddedString.push(role.id.toString());
                }
                for (let role of [...oldMember.roles.cache.filter((x) => !newMember.roles.cache.get(x.id)).values()]) {
                    roleRemovedString.push(role.id.toString());
                }

                const embeds = new EmbedBuilder()
                    .setAuthor({ name: 'Member Role Update', iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setDescription([
                        `<:RightArrow:1168278925579927602> **Responsible:** <@${user.id}>\`${user.id}\``,
                        `<:RightArrow:1168278925579927602> **Target:** <@${newMember.id}>\`${newMember.id}\``
                    ].join('\n'))
                    .addFields({
                        name: 'Changes', value: [
                            `<:Tick:1168280654157467648> Additions:`,
                            `<:Space:1130781236000985138><:RightArrow:1168278925579927602> <@&${roleAddedString.join('> , <@&')}>\`${roleAddedString.join(', ')}\``,
                            `<:Cross:1168280748759978054> Removals:`,
                            `<:Space:1130781236000985138><:RightArrow:1168278925579927602> <@&${roleRemovedString.join('> , <@&')}>\`${roleRemovedString.join(', ')}\``
                        ].join('\n')
                    })
                    .setColor(Colors.Orange)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ size: 4096 }) })
                    .setTimestamp();
                return await channel.send({ embeds: [embeds] });
            }

            if (newMember.roles.cache.filter((x) => !oldMember.roles.cache.get(x.id)).size > 0) {
                let roleAddedString = [];
                for (let role of [...newMember.roles.cache.filter((x) => !oldMember.roles.cache.get(x.id)).values()]) {
                    roleAddedString.push(role.id.toString());
                }
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: 'Member Role Update', iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setDescription([
                        `<:RightArrow:1168278925579927602> **Responsible:** <@${user.id}>\`${user.id}\``,
                        `<:RightArrow:1168278925579927602> **Target:** <@${newMember.id}>\`${newMember.id}\``
                    ].join('\n'))
                    .addFields({
                        name: 'Changes', value: [
                            `<:Tick:1168280654157467648> Additions:`,
                            `<:Space:1130781236000985138><:RightArrow:1168278925579927602> <@&${roleAddedString.join('> , <@&')}>(\`${roleAddedString.join(', ')}\`)`
                        ].join('\n')
                    })
                    .setColor(Colors.Orange)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ size: 4096 }) })
                    .setTimestamp();
                return await channel.send({ embeds: [embeds] });
            }

            if (oldMember.roles.cache.filter((x) => !newMember.roles.cache.get(x.id)).size > 0) {
                let roleRemovedString = [];
                for (let role of [...oldMember.roles.cache.filter((x) => !newMember.roles.cache.get(x.id)).values()]) {
                    roleRemovedString.push(role.id.toString());
                }
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: 'Member Role Update', iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setDescription([
                        `<:RightArrow:1168278925579927602> **Responsible:** <@${user.id}>\`${user.id}\``,
                        `<:RightArrow:1168278925579927602> **Target:** <@${newMember.id}>\`${newMember.id}\``
                    ].join('\n'))
                    .addFields({
                        name: 'Changes', value: [
                            `<:Cross:1168280748759978054> Removals:`,
                            `<:Space:1130781236000985138><:RightArrow:1168278925579927602> <@&${roleRemovedString.join('> , <@&')}>(\`${roleRemovedString.join(', ')}\`)`
                        ].join('\n')
                    })
                    .setColor(Colors.Orange)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ size: 4096 }) })
                    .setTimestamp();
                return await channel.send({ embeds: [embeds] });
            }

            if (oldMember.nickname !== newMember.nickname) {
                const embed = new EmbedBuilder()
                    .setTitle('Member Nickname Changed')
                    .setDescription(`**Old Nickname:** ${oldMember.nickname ? oldMember.nickname : 'None'}\n**New Nickname:** ${newMember.nickname ? newMember.nickname : 'None'}`)
                    .addFields(
                        { name: 'Member', value: `<@${newMember.id}>(\`${newMember.id}\`)` },
                        { name: 'Changed Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>(<t:${Math.floor(Date.now() / 1000)}>)` }
                    )
                    .setColor(Colors.Orange)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ size: 4096 }) });
                await channel.send({ embeds: [embed] });
            }
        });
    }
}
