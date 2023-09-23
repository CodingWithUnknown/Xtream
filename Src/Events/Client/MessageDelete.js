const { Events, EmbedBuilder, ChannelType, AuditLogEvent } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    execute: async (client, message) => {
        try {
            // if (message.author.bot) return;
            // if (message.channel.type === ChannelType.DM) return;
            // const log = await Servers.getLogger(message.guildId, logType.MessageDelete);
            // if (!log) return;
            let user;
            let icon;
            try {
                const auditLog = await message.guild.fetchAuditLogs({ type: AuditLogEvent.MessageDelete, limit: 10 });
                const entry = auditLog.entries.first();
                user = await client.users.fetch(entry.executor.id);
                if (user) icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            } catch (err) {
                console.log(err)
            }
            const embeds = new EmbedBuilder()
                .setTitle(`<:delete:1088764990938427423> Message Deleted`)
                .setDescription(`\`\`\`${message.content ? message.content : message.content.slice(0, 1024) + '...'}\`\`\``)
                .addFields(
                    { name: 'Member', value: `<@${message.author.id}> \`(${message.author.id})\``, inline: true },
                    { name: 'Channel', value: `<#${message.channelId}> \`(${message.channelId})\``, inline: true },
                    { name: 'Message Time', value: `<t:${Math.floor(message.createdTimestamp / 1000)}:R> - (<t:${Math.floor(message.createdTimestamp / 1000)}>)`, inline: false },
                    { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                )
                .setFooter(
                    { text: `Message ID: ${message.id}`, iconURL: client.user.displayAvatarURL({}) }
                )
                .setColor(0x2d2c31)
            if (user) {
                embeds.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: icon })
            } else {
                embeds.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({}) })
            }
            if (message.attachments.size > 0) {
                let attachment = message.attachments.first();
                if (attachment) {
                    embeds.setImage(attachment.url);
                }
            }
            /* await ClientLogger.sendWebhook(this.client, message.guildId, log.textId, {
                embeds: [embed]
            }); */
        } catch (err) {
            console.log(err);
        }
    }
};