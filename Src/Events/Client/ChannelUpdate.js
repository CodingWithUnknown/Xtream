const { Events, AuditLogEvent, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ChannelUpdate,
    execute: async (client, oldChannel, newChannel) => {
        try {
            if (oldChannel.type === ChannelType.DM) return
            const regEx = /^🟢｜ticket([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/i;
            if (regEx.test(channel.name)) return;
            const cnType = {
                0: 'Text Channel',
                2: 'Voice Channel',
                4: 'Category',
                13: 'Stage Channel',
                5: 'Announcement Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                12: 'Private Thread Channel',
                11: 'Public Thread Channel',
                10: 'News Thread Channel',
            }
            // const log = await Servers.getLogger(oldChannel.guild.id, logType.ChannelUpdate);
            // if (!log) return;
            const audit = await oldChannel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelUpdate, limit: 1 });
            const entry = audit.entries.first();
            const user = await client.users.fetch(entry.executor.id);

            const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            if (oldChannel.name !== newChannel.name) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Old Name', value: `${oldChannel.name}`, inline: true },
                        { name: 'New Name', value: `${newChannel.name}`, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.topic !== newChannel.topic) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Old Topic', value: `${oldChannel.topic ? oldChannel.topic : 'No Topic'}`, inline: true },
                        { name: 'New Topic', value: `${newChannel.topic}`, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.nsfw !== newChannel.nsfw) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Old NSFW', value: `${oldChannel.nsfw ? 'Yes' : 'No'}`, inline: true },
                        { name: 'New NSFW', value: `${newChannel.nsfw ? 'Yes' : 'No'}`, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.parentId !== newChannel.parentId) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Old Category', value: `${oldChannel.parent}`, inline: true },
                        { name: 'New Category', value: `${newChannel.parent}`, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Old Slowmode', value: `${oldChannel.rateLimitPerUser}`, inline: true },
                        { name: 'New Slowmode', value: `${newChannel.rateLimitPerUser}`, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(newChannel.createdTimestamp / 1000)}:R> - (<t:${Math.floor(newChannel.createdTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();
                await channel.send({ embeds: [embeds] });
            }
            const permDiff = oldChannel.permissionOverwrites.cache.filter(x => {
                if (newChannel.permissionOverwrites.cache.find(y => y.allow.bitfield == x.allow.bitfield) && newChannel.permissionOverwrites.cache.find(y => y.deny.bitfield == x.deny.bitfield)) {
                    return false;
                }
                return true;
            }).concat(newChannel.permissionOverwrites.cache.filter(x => {
                if (oldChannel.permissionOverwrites.cache.find(y => y.allow.bitfield == x.allow.bitfield) && oldChannel.permissionOverwrites.cache.find(y => y.deny.bitfield == x.deny.bitfield)) {
                    return false;
                }
                return true;
            }));

            if (permDiff.size) {
                const embeds = new EmbedBuilder()
                    .setAuthor(
                        { name: `${user.username}#${user.discriminator}`, iconURL: icon }
                    )
                    .setDescription(`<:up_n:1089775058026766377> ${cnType[channel.type]} Updated **${oldChannel.name}**`)
                    .setColor(0x2d2c31)
                    .setFooter(
                        { text: `Channel ID: ${newChannel.id.toString()}`, iconURL: client.user.displayAvatarURL() }
                    )
                    .setTimestamp();
                for (const permID of permDiff.keys()) {
                    const oldPerm = oldChannel.permissionOverwrites.cache.get(permID);
                    const newPerm = newChannel.permissionOverwrites.cache.get(permID);
                    const oldBitfields = {
                        allowed: oldPerm.allow ? oldPerm.allow.bitfield : 0,
                        denied: oldPerm.deny ? oldPerm.deny.bitfield : 0,
                    };
                    const newBitfields = {
                        allowed: newPerm.allow ? newPerm.allow.bitfield : 0,
                        denied: newPerm.deny ? newPerm.deny.bitfield : 0,
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
                        { name: `${role ? role.name : member.user.username}`, value: `${role ? `<@&${role.id}>` : member.user.toString()} \`(ID: ${role ? role.id : member.user.id})\``, inline: true },
                    )
                    if (oldBitfields.allowed !== newBitfields.allowed) {
                        embeds.addFields(
                            { name: 'Allowed Permissions', value: `\`${new PermissionsBitField(oldBitfields.allowed).toArray().join(', ') || 'None'}\`\nTo\n\`${new PermissionsBitField(newBitfields.allowed).toArray().join(', ') || 'None'}\``, inline: true },
                        );
                    }

                    if (oldBitfields.denied !== newBitfields.denied) {
                        embeds.addFields(
                            { name: 'Denied Permissions', value: `\`${new PermissionsBitField(oldBitfields.denied).toArray().join(', ') || 'None'}\`\nTo\n\`${new PermissionsBitField(newBitfields.denied).toArray().join(', ') || 'None'}\``, inline: true },
                        );
                    }
                    embeds.addFields(
                        { name: 'Channel', value: `${oldChannel.toString()} \`${oldChannel.id.toString()}\``, inline: true },
                        { name: 'Updated Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: true },
                    );
                }
                await channel.send({ embeds: [embeds] });
            }
        } catch (err) {
            if (err) return;
        }
    }
}
