const { Events, AuditLogEvent, ChannelType, EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.ChannelUpdate,
    execute: async (client, oldChannel, newChannel) => {
        await oldChannel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelUpdate }).then(async (audit) => {
            if (oldChannel.type === ChannelType.DM) return
            let user = await client.users.fetch(audit.entries.first().executor.id);
            let regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(oldChannel.name)) return;

            let type = {
                0: 'Text Channel (Default)',
                2: 'Voice Channel',
                4: 'Category',
                5: 'Announcement Channel',
                10: 'News Thread Channel',
                11: 'Public Thread Channel',
                12: 'Private Thread Channel',
                13: 'Stage Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                16: 'Media Channel'
            }

            console.log(oldChannel)
            console.log('--------------------------------------')
            console.log(newChannel.guild.roles.cache.get)

            let channel = oldChannel.guild.channels.cache.get('990186368237989948');

            if (oldChannel.name !== newChannel.name) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setTitle('<:UpdateChannel:1157204590496845864> Channel Override Update')
                    .setDescription(`<:UpdateChannel:1157204590496845864> ${type[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(Colors.Orange)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\`` },
                        { name: 'Old Name', value: `${oldChannel.name}` },
                        { name: 'New Name', value: `${newChannel.name}` },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:F> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)` },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.topic !== newChannel.topic) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setDescription(`<:UpdateChannel:1157204590496845864> ${type[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(Colors.Orange)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\`` },
                        { name: 'Old Topic', value: `${oldChannel.topic ? oldChannel.topic : 'No Topic'}` },
                        { name: 'New Topic', value: `${newChannel.topic}` },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:F> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)` },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.nsfw !== newChannel.nsfw) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setDescription(`<:UpdateChannel:1157204590496845864> ${type[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(Colors.Orange)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\`` },
                        { name: 'Old NSFW', value: `${oldChannel.nsfw ? 'Yes' : 'No'}` },
                        { name: 'New NSFW', value: `${newChannel.nsfw ? 'Yes' : 'No'}` },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:F> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)` },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.parentId !== newChannel.parentId) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` })
                    .setDescription(`<:UpdateChannel:1157204590496845864> ${type[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(Colors.Orange)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\`` },
                        { name: 'Old Category', value: `${oldChannel.parent}` },
                        { name: 'New Category', value: `${newChannel.parent}` },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:F> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)` },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                const embeds = new EmbedBuilder()
                    .setTitle('<:UpdateChannel:1157204590496845864> Channel Update')
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setDescription([
                        `<:Right_Icon:1156641305770860646> **Responsible:** <@${user.id}> \`${user.id}\``,
                        `<:Right_Icon:1156641305770860646> **Target:** ${oldChannel.toString()} \`${oldChannel.id}\``,
                        `<:Right_Icon:1156641305770860646> **Type:** ${type[channel.type]}`,
                        `<:Right_Icon:1156641305770860646> <t:${Math.floor(Date.now() / 1000)}:F>`
                    ].join('\n'))
                    .addFields(
                        {
                            name: 'Changes', value: [
                                `<:Right_Icon:1156641305770860646> **Rate Limit Par User:** ${oldChannel.rateLimitPerUser || 'Default'} <:Right_Icon:1156641305770860646> ${newChannel.rateLimitPerUser || 'Default'}`
                            ].join('\n')
                        }
                    )
                    .setColor(Colors.Orange);
                await channel.send({ embeds: [embeds] });
            }
            const permDiff = oldChannel.permissionOverwrites.cache.filter((x) => {
                if (newChannel.permissionOverwrites.cache.find((y) => y.allow.bitfield == x.allow.bitfield) && newChannel.permissionOverwrites.cache.find((y) => y.deny.bitfield == x.deny.bitfield)) {
                    return false;
                }
                return true;
            }).concat(newChannel.permissionOverwrites.cache.filter((x) => {
                if (oldChannel.permissionOverwrites.cache.find((y) => y.allow.bitfield == x.allow.bitfield) && oldChannel.permissionOverwrites.cache.find((y) => y.deny.bitfield == x.deny.bitfield)) {
                    return false;
                }
                return true;
            }));

            if (permDiff.size) {
                const embeds = new EmbedBuilder()
                    .setAuthor(
                        { name: `${user.username}#${user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` }
                    )
                    .setTitle('<:UpdateChannel:1157204590496845864> Channel Overwrite Update')
                    .setDescription([
                        `**Responsible:** <@${user.id}> \`${user.id}\``,
                        `**Channel:** ${newChannel.id.toString()} \`${newChannel.id}\``,
                        // `**Target:** ${newChannel}`
                    ].join('\n'))
                    .setDescription(`${type[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(Colors.Orange)
                    .setTimestamp();
                for (let permID of permDiff.keys()) {
                    let oldPerm = oldChannel.permissionOverwrites.cache.get(permID);
                    let newPerm = newChannel.permissionOverwrites.cache.get(permID);
                    const oldBitfields = {
                        allowed: oldPerm.allow ? oldPerm.allow.bitfield : 0,
                        denied: oldPerm.deny ? oldPerm.deny.bitfield : 0
                    };
                    const newBitfields = {
                        allowed: newPerm.allow ? newPerm.allow.bitfield : 0,
                        denied: newPerm.deny ? newPerm.deny.bitfield : 0
                    };

                    let role;
                    let member;
                    if (oldPerm.type === 0 || newPerm.type === 0) {
                        role = newChannel.guild.roles.cache.get(newPerm.id || oldPerm.id);
                    }
                    if (oldPerm.type === 1 || newPerm.type === 1) {
                        member = await newChannel.guild.members.fetch(newPerm.id || oldPerm.id);
                    }
                    embeds.addFields(
                        { name: `${role ? role.name : member.user.username}`, value: `${role ? `<@&${role.id}>` : member.user.toString()} \`(ID: ${role ? role.id : member.user.id})\`` },
                    )
                    if (oldBitfields.allowed !== newBitfields.allowed) {
                        embeds.addFields(
                            { name: 'Allowed Permissions', value: `\`${new PermissionsBitField(oldBitfields.allowed).toArray().join(', ') || 'None'}\`\nTo\n\`${new PermissionsBitField(newBitfields.allowed).toArray().join(', ') || 'None'}\`` },
                        );
                    }

                    if (oldBitfields.denied !== newBitfields.denied) {
                        embeds.addFields(
                            { name: 'Denied Permissions', value: `\`${new PermissionsBitField(oldBitfields.denied).toArray().join(', ') || 'None'}\`\nTo\n\`${new PermissionsBitField(newBitfields.denied).toArray().join(', ') || 'None'}\`` },
                        );
                    }
                    embeds.addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\`` },
                        { name: 'Updated Time', value: `<t:${Math.floor(Date.now() / 1000)}:F> - (<t:${Math.floor(Date.now() / 1000)}>)` },
                    );
                }
                await channel.send({ embeds: [embeds] });
            }
        });
    }
}
