const { Events, EmbedBuilder, AuditLogEvent, ChannelType } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    execute: async (client, oldMessage, newMessage) => {
        await oldMessage.guild.fetchAuditLogs({ type: AuditLogEvent.MessageUpdate, limit: 10 }).then(async (audit) => {
            if (oldMessage?.author?.bot) return;
            if (oldMessage.channel.type === ChannelType.DM) return;
            
            if (oldMessage.content === newMessage.content) return;
            let channel = await oldMessage.guild.channels.cache.get('990186368237989948');
            const embeds = new EmbedBuilder()
                .setAuthor(
                    { name: oldMessage.author?.displayName, iconURL: oldMessage.author?.displayAvatarURL() }
                )
                .setTitle(`<:edit:1089775740255473714> Message Edited`)
                .setDescription(`**Before:**\n\`\`\`${oldMessage.content.length > 1024 ? oldMessage.content.slice(0, 1024) + '...' : oldMessage.content}\`\`\`\n**After:**\n\`\`\`${newMessage.content.length > 1024 ? newMessage.content.slice(0, 1024) + '...' : newMessage.content}\`\`\``)
                .addFields(
                    { name: 'Member', value: `<@${oldMessage.author.id}> \`(${oldMessage.author.id})\``, inline: true },
                    { name: 'Channel', value: `<#${oldMessage.channelId}> \`(${oldMessage.channelId})\``, inline: true },
                    { name: 'Message Time', value: `<t:${Math.floor(oldMessage.createdTimestamp / 1000)}:R> - (<t:${Math.floor(oldMessage.createdTimestamp / 1000)}>)`, inline: false },
                    { name: 'Edited Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                )
                .setFooter(
                    { text: `Message ID: ${oldMessage.id}`, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)

            if (oldMessage.attachments.size > 0) {
                const attachment = oldMessage.attachments.first();
                if (attachment) {
                    embeds.setImage(attachment.url);
                }
            }

            await channel.send({ embeds: [embeds] });
        });
    }
};