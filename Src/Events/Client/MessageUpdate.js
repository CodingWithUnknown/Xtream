const { Events, AuditLogEvent, ChannelType, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    execute: async (client, oldMessage, newMessage) => {
        await oldMessage.guild.fetchAuditLogs({ type: AuditLogEvent.MessageUpdate, limit: 1 }).then(async (audit) => {
            if (oldMessage?.author?.bot) return;
            if (oldMessage.channel.type === ChannelType.DM) return;
            if (oldMessage.content === newMessage.content) return;
            if (oldMessage.content === null) return;
            let user;
            let icon;
            user = await client.users.fetch(audit.entries.first().executor.id);
            if (user) icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = await oldMessage.guild.channels.cache.get('990186368237989948');

            const raw = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Go to Message')
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://discord.com/channels/${newMessage.guildId}/${newMessage.channelId}/${newMessage.id}`)
                )

            const embeds = new EmbedBuilder()
                .setTitle('<:icons_update:1156897704551665664> Message Edited')
                .setDescription([
                    `<:Right_Icon:1156641305770860646> **Responsible:** <@${newMessage.author.id}> \`(${newMessage.author.id})\``,
                    `<:Right_Icon:1156641305770860646> **Target:** <#${oldMessage.channelId}> \`(${oldMessage.channelId})\``,
                    `<:Right_Icon:1156641305770860646> **Created Time:** <t:${Math.floor(oldMessage.createdTimestamp / 1000)}:F>`,
                    `<:Right_Icon:1156641305770860646> **Edited Time:** <t:${Math.floor(newMessage.editedTimestamp / 1000)}:F>`
                ].join('\n'))
                .setColor(Colors.Orange);

            if (user) {
                embeds.setThumbnail(icon);
            } else {
                embeds.setThumbnail(newMessage.author.displayAvatarURL({ size: 4096 }));
            }

            if (oldMessage.content === '') {
                embeds.addFields({
                    name: 'Changes', value: [
                        `<:Right_Icon:1156641305770860646> **Content:**`,
                        `\`\`\`diff`,
                        `+ ${newMessage.content}`,
                        `\`\`\``
                    ].join('\n')
                })
            } else {
                embeds.addFields({
                    name: 'Changes', value: [
                        `<:Right_Icon:1156641305770860646> **Content:**`,
                        `\`\`\`diff`,
                        `- ${oldMessage.content}`,
                        `+ ${newMessage.content}`,
                        `\`\`\``
                    ].join('\n')
                })
            }

            if (oldMessage.attachments.size > 0) {
                const attachment = oldMessage.attachments.first();
                if (attachment) {
                    embeds.addFields({
                        name: '<:Right_Icon:1156641305770860646> Attachments', value: [
                            `**[**\`${attachment.name}\`**]** <:Right_Icon:1156641305770860646> **[**\`${newMessage.attachments.first().name}\`**]**`
                        ].join('\n')
                    })
                    embeds.setImage(attachment.proxyURL);
                }
            }

            await channel.send({ embeds: [embeds], components: [raw] });
        });
    }
};