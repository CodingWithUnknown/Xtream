const { Events, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    execute: async (client, oldMessage, newMessage) => {
        try {
            if (oldMessage?.author?.bot) return;
            if (oldMessage.channel.type === ChannelType.DM) return;
            // const log = await Servers.getLogger(oldMessage.guildId, logType.MessageEdit);
            // if (!log) return;
            if (oldMessage.content === newMessage.content) return;
            let channel = client.channels.chche.get('990186368237989948');
            const embeds = new EmbedBuilder()
                .setAuthor(
                    { name: oldMessage.author?.tag, iconURL: oldMessage.author?.displayAvatarURL() }
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

            /* await ClientLogger.sendWebhook(this.client, oldMessage.guildId, log.textId, {
                embeds: [embed]
            }); */
        } catch (err) {
            console.log(err)
        }

    }
};