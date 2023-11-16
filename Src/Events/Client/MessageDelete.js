const { Events, AuditLogEvent, ChannelType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    execute: async (client, message) => {
        await message.guild.fetchAuditLogs({ type: AuditLogEvent.MessageDelete }).then(async (audit) => {
            if (message?.author?.bot) return;
            if (message.channel.type === ChannelType.DM) return;
            if (message.content === null) return;
            let user;
            let icon;
            user = await client.users.fetch(audit.entries.first().executor.id);
            if (user) icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = await message.guild.channels.cache.get('990186368237989948');

            const embeds = new EmbedBuilder()
                .setTitle('<:delete_message:1157180194931626014> Message Deleted')
                .setDescription([
                    `<:Right_Icon:1156641305770860646> <t:${Math.floor(Date.now() / 1000)}:F>`,
                    '**Previous Settings**',
                    `<:Right_Icon:1156641305770860646> **Channel:** <#${message.channelId}> \`(${message.channelId})\``,
                    `<:Right_Icon:1156641305770860646> **Created Time:** <t:${Math.floor(message.createdTimestamp / 1000)}:R> (<t:${Math.floor(message.createdTimestamp / 1000)}>)`,
                    `<:Right_Icon:1156641305770860646> **Content:**`,
                    `\`\`\`diff`,
                    `- ${message.content}`,
                    `\`\`\``,
                    `<:Right_Icon:1156641305770860646> **Author:** <@${message.author.id}> \`(${message.author.id})\``
                ].join('\n'))
                .setColor(Colors.Red);

            if (user) {
                embeds.setThumbnail(icon);
            } else {
                embeds.setThumbnail(message.author.displayAvatarURL({ size: 4096 }));
            }

            if (message.attachments.size > 0) {
                let attachment = message.attachments.first();
                if (attachment) {
                    embeds.setDescription([
                        `<:Right_Icon:1156641305770860646> <t:${Math.floor(Date.now() / 1000)}:F>`,
                        '**Previous Settings**',
                        `<:Right_Icon:1156641305770860646> **Channel:** <#${message.channelId}> \`(${message.channelId})\``,
                        `<:Right_Icon:1156641305770860646> **Created Time:** <t:${Math.floor(message.createdTimestamp / 1000)}:R> (<t:${Math.floor(message.createdTimestamp / 1000)}>)`,
                        `<:Right_Icon:1156641305770860646> **Content:**`,
                        `\`\`\`diff`,
                        `- ${message.content}`,
                        `\`\`\``,
                        `<:Right_Icon:1156641305770860646> **Author:** <@${message.author.id}> \`(${message.author.id})\``,
                        `<:Right_Icon:1156641305770860646> Attachments **[**\`${attachment.name}\`**]**`
                    ].join('\n'))
                    embeds.setImage(attachment.proxyURL);
                }
            }
            await channel.send({ embeds: [embeds] });
        });
    }
};