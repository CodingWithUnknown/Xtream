const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    execute: async (client, oldState, newState) => {
        try {
            let newMember = newState.guild.members.cache.get(newState.id);
            if (newState.id == client.user.id) return;

            let channels = client.channels.cache.get('990186368237989948');

            if (oldState.serverDeaf != newState.serverDeaf) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setDescription(`Just got a voice server ${newState.serverDeaf ? 'deafen' : 'undeafen'}`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId)} (${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId).id})`, inline: false },
                        { name: 'Deafen', value: `${newState.serverDeaf ? 'deafen' : 'undeafen'}`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }

            if (!oldState.channel && newState.channel) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`${newMember} just joined a voice channel`)
                    .addFields(
                        { name: 'Channel', value: `${newState.channel} (${newState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }

            if (oldState.channel && !newState.channel) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`${newMember} just left a voice channel`)
                    .addFields(
                        { name: 'Channel', value: `${oldState.channel} (${oldState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }

            if (oldState.channel && newState.channel) {
                if (oldState.channelId === newState.channelId) return;
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setThumbnail(newMember.user.displayAvatarURL())
                    .setDescription(`🚚 ${newMember.user.tag} just moved to a voice channel`)
                    .addFields(
                        { name: 'Old Channel', value: `${oldState.channel} (${oldState.channelId})`, inline: false },
                        { name: 'New Channel', value: `${newState.channel} (${newState.channelId})`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }

            if (oldState.serverMute != newState.serverMute) {
                const embeds = new EmbedBuilder()
                    .setAuthor(
                        { name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() }
                    )
                    .setDescription(`Just got a server ${newState.serverMute ? 'muted' : 'unmuted'}`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId)} (${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId).id})`, inline: false },
                        { name: 'Server Mute', value: `${newState.serverMute ? 'muted' : 'unmuted'}`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }

            if (oldState.streaming != newState.streaming) {
                const embeds = new EmbedBuilder()
                    .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
                    .setDescription(`🎥 just started streaming`)
                    .addFields(
                        { name: 'Member', value: `${newMember} (${newMember.id})`, inline: false },
                        { name: 'Channel', value: `${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId)} (${newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId).id})`, inline: false },
                        { name: 'Streaming', value: `${newState.streaming ? 'Yes' : 'No'}`, inline: false },
                        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                    )
                    .setColor(0x141318)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                await channels.send({ embeds: [embeds] });
            }
        } catch (err) {
            console.log(err);
        }
    }
}