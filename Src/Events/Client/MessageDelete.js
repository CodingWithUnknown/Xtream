const { Events, EmbedBuilder, AuditLogEvent, ChannelType } = require('discord.js');
const { audio } = require('systeminformation');

module.exports = {
    name: Events.MessageDelete,
    execute: async (client, message) => {
        await message.guild.fetchAuditLogs({ type: AuditLogEvent.MessageDelete, limit: 10 }).then(async (audit) => {
            if (message?.author?.bot) return;
            if (message.channel.type === ChannelType.DM) return;
            let user;
            let icon;
            user = await client.users.fetch(audit.entries.first().executor.id);
            if (user) icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = await message.guild.channels.cache.get('990186368237989948');

            const embeds = new EmbedBuilder()
                .setTitle(`Message Deleted`)
                .setDescription(`\`\`\`${message.content ?? message.content.slice(0, 1024) + '...'}\`\`\``)
                .addFields(
                    { name: 'Member', value: `<@${message.author.id}> \`(${message.author.id})\``, inline: true },
                    { name: 'Channel', value: `<#${message.channelId}> \`(${message.channelId})\``, inline: true },
                    { name: 'Message Time', value: `<t:${Math.floor(message.createdTimestamp / 1000)}:R> - (<t:${Math.floor(message.createdTimestamp / 1000)}>)`, inline: false },
                    { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                )
                .setFooter(
                    { text: `Message ID: ${message.id}`, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
            if (user) {
                embeds.setAuthor(
                    { name: `${user.username}#${user.discriminator}`, iconURL: icon }
                );
            } else {
                embeds.setAuthor(
                    { name: message.author.tag, iconURL: message.author.displayAvatarURL() }
                );
            }
            if (message.attachments.size > 0) {
                let attachment = message.attachments.first();
                if (attachment) { embeds.setImage(attachment.url); }
            }
            await channel.send({ embeds: [embeds] });
        });
    }
};