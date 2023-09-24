const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ThreadUpdate,
    execute: async (client, oldThread, newThread) => {
        try {
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
            // const log = await Servers.getLogger(newThread.guild.id, logType.threadUpdate);
            // if (!log) return
            const auditLog = await newThread.guild.fetchAuditLogs({ type: AuditLogEvent.ThreadUpdate, limit: 1 });
            const entry = auditLog.entries.first();
            let user = await this.client.users.fetch(entry.executor.id);

            let icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            let channel = client.channels.cache.get('990186368237989948');

            if (oldThread.name != newThread.name) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setColor(0x2d2c31)
                    .setDescription(`<:up_n:1089775058026766377> **${cnType[newThread.type]}** updated in ${newThread.toString()}`)
                    .addFields(
                        { name: `Old Name`, value: oldThread.name, inline: true },
                        { name: `New Name`, value: newThread.name, inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();
                await channel.send({embeds: [embed] });
            }

            if (oldThread.archived != newThread.archived) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setColor(0x2d2c31)
                    .setDescription(`<:up_n:1089775058026766377> **${cnType[newThread.type]}** archived status updated in ${newThread.toString()}`) // ${newThread.archived ? 'Archived' : 'Active
                    .addFields(
                        { name: `Old Status`, value: oldThread.archived ? 'Archived' : 'Active', inline: true },
                        { name: `New Status`, value: newThread.archived ? 'Archived' : 'Active', inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();
                await channel.send({embeds: [embed] });
            }

            if (oldThread.locked != newThread.locked) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: user.tag, iconURL: icon })
                    .setColor(0x2d2c31)
                    .setDescription(`<:up_n:1089775058026766377> **${cnType[newThread.type]}** locked status updated in ${newThread.toString()}`) // ${newThread.locked ? 'Locked' : 'Unlocked
                    .addFields(
                        { name: `Old Status`, value: oldThread.locked ? 'Locked' : 'Unlocked', inline: true },
                        { name: `New Status`, value: newThread.locked ? 'Locked' : 'Unlocked', inline: true },
                    )
                    .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL({}) })
                    .setTimestamp();
                await channel.send({embeds: [embed] });
            }

        } catch (err) {
            console.log(err);
        }
    }
}