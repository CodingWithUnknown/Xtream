const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    execute: async (client, oldState, newState) => {
        try {
            const newMember = newState.guild.members.cache.get(newState.id);
            const channel = newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId);
            if (newState.id == client.user.id) return;

            let channels = client.channels.cache.get('990186368237989948');

            if (oldState.serverDeaf != newState.serverDeaf) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceServerDeafen);
                // if (!log) return
                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setDescription(`<:defined:1089892793742266398> just got a voice server ${newState.serverDeaf ? '' : 'un'}deafen`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${channel} (${channel.id})`, inline: false },
                        { name: 'Deafen', value: `${newState.serverDeaf ? '' : 'un'}deafen`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }

            if (!oldState.channel && newState.channel) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceJoin);
                // if (!log) return
                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`<:join:1089779782637592656> ${newMember} just joined a voice channel`)
                    .addFields(
                        { name: 'Channel', value: `${newState.channel} (${newState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }

            if (oldState.channel && !newState.channel) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceLeave);
                // if (!log) return

                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`<:leave:1089779746881155112> ${newMember} just left a voice channel`)
                    .addFields(
                        { name: 'Channel', value: `${oldState.channel} (${oldState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }

            if (oldState.channel && newState.channel) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceMove);
                // if (!log) return
                if (oldState.channelId === newState.channelId) return;
                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`🚚 ${newMember.user.tag} just moved to a voice channel`)
                    .addFields(
                        { name: 'Old Channel', value: `${oldState.channel} (${oldState.channelId})`, inline: false },
                        { name: 'New Channel', value: `${newState.channel} (${newState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }

            if (oldState.serverMute != newState.serverMute) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceServerMute);
                // if (!log) return
                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setDescription(`<:muted:1089892710665691186> just got a server ${newState.serverMute ? '' : 'un'}muted`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${channel} (${channel.id})`, inline: false },
                        { name: 'Server Mute', value: `${newState.serverMute ? '' : 'un'}muted`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }
            if (oldState.streaming != newState.streaming) {
                // const log = await Servers.getLogger(newState.guild.id, logType.VoiceStream);
                // if (!log) return

                const embed = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setColor(0x2d2c31)
                    .setDescription(`🎥 just started streaming`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${channel} (${channel.id})`, inline: false },
                        { name: 'Streaming', value: `${newState.streaming ? 'Yes' : 'No'}`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embed] });
            }

        } catch (err) {
            console.log(err);
        }
    }
}